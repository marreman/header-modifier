const { handleRequest } = require("./header-modifier")

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    const result = handleRequest(details, undefined)

    console.log("onBeforeSendHeaders", result)

    return result
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    const result = handleRequest(details, undefined)

    console.log("onHeadersReceived", result)

    return result
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
)
