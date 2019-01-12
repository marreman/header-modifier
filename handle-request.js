const createRequestHandler = options => ({
  url,
  requestHeaders,
  responseHeaders
}) => {
  if (!url.includes(options.url)) return

  return {
    requestHeaders:
      requestHeaders &&
      requestHeaders.map(header =>
        replaceHeaders(options.requestHeaders, header)
      ),
    responseHeaders:
      responseHeaders &&
      responseHeaders.map(header =>
        replaceHeaders(options.responseHeaders, header)
      )
  }
}

function replaceHeaders(replacements, header) {
  const replacement = replacements[header.name]

  return {
    name: header.name,
    value: replacement
      ? header.value.replace(replacement.from, replacement.to)
      : header.value
  }
}

function test() {
  const handleRequest = createRequestHandler({
    url: "foo.com",
    requestHeaders: {
      Origin: { from: "foo.com", to: "changed.com" }
    },
    responseHeaders: {
      "Access-Control-Allow-Origin": {
        from: "bar.com",
        to: "bar-changed.com"
      }
    }
  })

  const result = handleRequest({
    url: "foo.com",
    requestHeaders: [
      { name: "Origin", value: "foo.com" },
      { name: "test", value: "untouched.com" }
    ],
    responseHeaders: [
      { name: "Access-Control-Allow-Origin", value: "bar-changed.com" }
    ]
  })

  console.log(result)
  console.log("1.", result.requestHeaders[0].value === "changed.com")
  console.log("2.", result.requestHeaders[1].value === "untouched.com")
  console.log("3.", result.responseHeaders[0].value === "bar-changed.com")
}

// test()
