const handler = createRequestHandler({
  url: "api.vcm-staging.sh",
  requestHeaders: {
    Origin: {
      from: "localhost",
      to: "local.drivekitt.com"
    },
    Referer: {
      from: "localhost",
      to: "local.drivekitt.com"
    }
  },
  responseHeaders: {
    "access-control-allow-origin": {
      from: "local.drivekitt.com",
      to: "localhost"
    }
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    const n = handler(details)

    console.log(n)

    return n
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    const n = handler(details)

    console.log(n)

    return n
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
)

