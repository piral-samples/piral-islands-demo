export const port = +process.env.PORT || 3000;

export const server = `http://localhost:${port}`;
export const feedUrl = "https://feed.dev.piral.cloud/api/v1/pilet/islands-demo";
export const feedEvents = "wss://feed.dev.piral.cloud/api/v1/pilet/islands-demo";
