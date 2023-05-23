import * as React from "react";

interface HomePageProps {
  api: any;
  sku?: string;
}

const HomePage: React.FC<HomePageProps> = ({ api, sku = "porsche" }) => (
  <api.Component name="product" params={{ sku }} />
);

export default HomePage;
