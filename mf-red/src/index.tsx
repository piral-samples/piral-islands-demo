import "./product-page.css";

export function setup(api: any) {
  api.registerHandler("/api/products/:product", () => import("./handler"));

  api.registerPage("/products/:sku?", () => import("./HomePage"), {
    client: "none",
  });

  api.registerComponent("product", () => import("./Product"), {
    client: "none",
    data: {
      product: () =>
        fetch(`${api.meta.config.server}/api/products/tractor`).then((res) =>
          res.json()
        ),
    },
  });
}
