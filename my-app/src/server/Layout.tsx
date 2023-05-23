import * as React from "react";
import { UserPiletContext } from "./types";

interface LayoutProps {
  children: React.ReactNode;
  context: UserPiletContext;
}

const style = `
* {
  box-sizing: border-box;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

piral-component, piral-slot {
  display: contents;
}

aside {
  border-top: 1px solid gray;
  padding-top: 20px;
}

dl {
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 2px;
  grid-template-columns: 2fr 1fr;
  max-width: 300px;
}

dt {
  text-align: right;
}

dd {
  margin: 0;
}
`;

export const Layout: React.FC<LayoutProps> = ({ children, context }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>Tractor Store</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <style dangerouslySetInnerHTML={{ __html: context.cssContent }} />
    </head>
    <body>
      {children}
      <script dangerouslySetInnerHTML={{ __html: context.jsContent }} />
    </body>
  </html>
);
