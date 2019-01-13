import { Elm } from "./Background.elm"

const app = Elm.Background.init()

console.log(app)

const handler = createRequestHandler({
  url: "google.com",
  requestHeaders: {
    Origin: {
      from: "localhost",
      to: "google.com"
    }
  },
  responseHeaders: {
    "access-control-allow-origin": {
      from: "google.com",
      to: "localhost"
    }
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  handler,
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onHeadersReceived.addListener(
  handler,
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
)

