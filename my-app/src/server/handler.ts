import { AdapterRequestContext, HattipHandler } from "@hattip/core";
import { loadPilets } from "./components";
import { createSessionCookie, getSessionId } from "./cookie";
import { renderFragment, renderLayout } from "./render";
import { updateStore } from "./state";
import { getFragment } from "./route";
import { SessionId, UserPiletContext } from "./types";
import { initAsyncContext } from "./request";
import { callRegisteredHandlers } from "./handlers";
import { server } from "./constants";

function handleStoreUpdate(context: UserPiletContext, data: FormData) {
  const store = data.get("store");
  let item = {};

  for (const key of data.keys()) {
    if (key === "item") {
      item = data.get(key);
    } else if (key.startsWith("item.")) {
      item[key.substring(5)] = data.get(key);
    }
  }

  if (store && typeof store === "string") {
    updateStore(context, store, item);
  }
}

async function getPiletContext(
  context: AdapterRequestContext
): Promise<[UserPiletContext, SessionId]> {
  const sessionId = getSessionId(context.request.headers.get("cookie"));
  const piletContext = await loadPilets(sessionId.value);
  return [piletContext, sessionId];
}

export const handler: HattipHandler = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    const [piletContext, sessionId] = await getPiletContext(context);
    initAsyncContext(sessionId, piletContext, context);
    const response = await callRegisteredHandlers(piletContext, context.request);

    if (response) {
      return response;
    }
  } else if (context.request.method === "GET") {
    if (pathname.startsWith("/fragment/")) {
      const useragent = context.request.headers.get("user-agent");
      const [piletContext, sessionId] = await getPiletContext(context);
      const name = Buffer.from(pathname.substring(10), "base64url").toString(
        "utf8"
      );
      const content = getFragment(name, url, piletContext);
      initAsyncContext(sessionId, piletContext, context);
      const body = await renderFragment(content, useragent, piletContext);
      return new Response(body);
    } else if (pathname === "/") {
      return Response.redirect(server + "/products");
    } else if (pathname.startsWith("/products")) {
      const useragent = context.request.headers.get("user-agent");
      const [piletContext, sessionId] = await getPiletContext(context);
      const content = getFragment(`page:${pathname}`, url, piletContext);

      if (content) {
        initAsyncContext(sessionId, piletContext, context);
        const body = await renderLayout(content, useragent, piletContext);
        const response = new Response(body);

        if (sessionId.renew) {
          response.headers.set(
            "set-cookie",
            createSessionCookie(sessionId.value)
          );
        }

        return response;
      }
    }
  } else if (context.request.method === "POST") {
    const [piletContext, sessionId] = await getPiletContext(context);
    const data = await context.request.formData();
    initAsyncContext(sessionId, piletContext, context);
    handleStoreUpdate(piletContext, data);
    return Response.redirect(server + pathname);
  } else if (context.request.method === "PATCH") {
    const [piletContext, sessionId] = await getPiletContext(context);
    const data = await context.request.json();
    initAsyncContext(sessionId, piletContext, context);
    updateStore(piletContext, data.store, data.item);
    return new Response("", { status: 201 });
  }

  return new Response("Not found.", { status: 404 });
};
