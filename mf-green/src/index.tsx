import "./recommendations.css";

export function setup(api: any) {
  api.registerComponent(
    "recommendations",
    () => import("./ProductRecommendations"),
    {
      client: "none",
    }
  );
}
