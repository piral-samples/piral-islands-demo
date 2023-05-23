import "systemjs";
import "systemjs/dist/extras/named-register.js";

import WebSocket from "ws";
import { createServer } from "@hattip/adapter-node";
import { events } from "./events";
import { handler } from "./handler";
import { feedEvents, port } from "./constants";
import { installFetchInterceptor } from "./fetch";

installFetchInterceptor();

createServer(handler).listen(port, "localhost", () => {
  const ws = new WebSocket(feedEvents, {
    perMessageDeflate: false,
  });

  ws.on("message", (buffer) => {
    const msg = JSON.parse(buffer.toString("utf8"));

    if (msg.type === 'update-pilet') {
      events.emit("pilet-changed", msg.data);
    }
  });

  console.log(`Server listening on http://localhost:${port}`);
});
