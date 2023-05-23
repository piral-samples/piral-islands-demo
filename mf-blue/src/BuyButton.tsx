import * as React from "react";

const defaultPrice = "0,00 €";
const prices = {
  porsche: "66,00 €",
  fendt: "54,00 €",
  eicher: "58,00 €",
};

interface BuyButtonProps {
  sku?: string;
  api: any;
}

const BuyButton: React.FC<BuyButtonProps> = ({ sku = "porsche", api }) => {
  const price = prices[sku] || defaultPrice;
  const submit = (e) => {
    e.preventDefault();
    api.getStore("cart").update(price);
    return false;
  };

  return (
    <div id="buy" className="blue-basket">
      <form method="POST" onSubmit={submit}>
        <button>
          <span className="buy-icon"></span>
          <span>buy for {price}</span>
        </button>
        <input type="hidden" name="store" value="cart" />
        <input type="hidden" name="item" value={price} />
      </form>
    </div>
  );
};

export default BuyButton;
