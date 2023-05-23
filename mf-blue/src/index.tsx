import "./basket-info.css";
import "./buy-button.css";

export function setup(api: any) {
  api.setStore("cart", () => import("./store"));

  api.registerComponent("basket", () => import("./BasketInfo"));
  api.registerComponent("buy", () => import("./BuyButton"));
}
