import * as React from "react";
import reco_1 from "./images/reco_1.jpg";
import reco_2 from "./images/reco_2.jpg";
import reco_3 from "./images/reco_3.jpg";
import reco_4 from "./images/reco_4.jpg";
import reco_5 from "./images/reco_5.jpg";
import reco_6 from "./images/reco_6.jpg";
import reco_7 from "./images/reco_7.jpg";
import reco_8 from "./images/reco_8.jpg";
import reco_9 from "./images/reco_9.jpg";

const recommendationImages = {
  "1": reco_1,
  "2": reco_2,
  "3": reco_3,
  "4": reco_4,
  "5": reco_5,
  "6": reco_6,
  "7": reco_7,
  "8": reco_8,
  "9": reco_9,
};

const allRecommendations: Record<string, Array<string>> = {
  porsche: ["3", "5", "6"],
  fendt: ["3", "6", "4"],
  eicher: ["1", "8", "7"],
};

interface ProductRecommendationsProps {
  sku?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  sku = "porsche",
}) => {
  const recommendations = allRecommendations[sku] || allRecommendations.porsche;

  return (
    <div id="reco" className="green-recos">
      <h3>Related Products</h3>
      {recommendations.map((id) => (
        <img
          src={recommendationImages[id]}
          key={id}
          alt={`Recommendation ${id}`}
        />
      ))}
    </div>
  );
};

export default ProductRecommendations;
