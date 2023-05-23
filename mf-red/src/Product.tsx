import * as React from "react";

interface ProductData {
  name: string;
  variants: Array<{
    sku: string;
    name: string;
    image: string;
    thumb: string;
  }>;
}

interface ProductPageProps {
  sku: string;
  product: ProductData;
  api: any;
}

function getCurrent(product: ProductData, sku: string) {
  return product.variants.find((v) => v.sku === sku) || product.variants[0];
}

const pathPrefix = "/products/";

const Product: React.FC<ProductPageProps> = ({ sku, product, api }) => {
  const current = getCurrent(product, sku);

  return (
    <div className="product-page-grid">
      <h1 id="store">The Model Store</h1>
      <api.Component name="basket" params={{ sku }} />
      <div id="image">
        <div>
          <img src={current.image} alt={current.name} />
        </div>
      </div>
      <h2 id="name">
        {product.name} <small>{current.name}</small>
      </h2>
      <div id="options">
        {product.variants.map((variant) => (
          <a
            key={variant.sku}
            className={sku === variant.sku ? "active" : ""}
            href={`${pathPrefix}${variant.sku}`}
          >
            <img src={variant.thumb} alt={variant.name} />
          </a>
        ))}
      </div>
      <api.Component name="buy" params={{ sku }} />
      <api.Component name="recommendations" params={{ sku }} />
    </div>
  );
};

export default Product;
