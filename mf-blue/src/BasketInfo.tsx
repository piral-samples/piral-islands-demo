import * as React from "react";

interface BasketInfoProps {
  sku?: string;
  api: any;
}

const BasketInfo: React.FC<BasketInfoProps> = ({ api }) => {
  const [count, setCount] = React.useState(api.getStore("cart").get().count);

  React.useEffect(() => {
    const handler = () => setCount(api.getStore("cart").get().count);

    api.on("added-item", handler);
    return () => {
      api.off("added-item", handler);
    };
  }, []);

  return (
    <div id="basket" className="blue-basket">
      <div className={count === 0 ? "empty" : "filled"}>
        Basket: {count} item(s)
      </div>
    </div>
  );
};

export default BasketInfo;
