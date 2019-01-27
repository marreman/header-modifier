module.exports.handleRequest = function replaceRequestHeaders(request, config) {
  if (!config) {
    return
  }

  if (!request.url.includes(config.url)) {
    return
  }

  return {
    requestHeaders:
      request.requestHeaders &&
      request.requestHeaders.map(header =>
        replaceHeaders(config.requestHeaders, header)
      ),
    responseHeaders:
      request.responseHeaders &&
      request.responseHeaders.map(header =>
        replaceHeaders(config.responseHeaders, header)
      )
  }
}

function replaceHeaders(replacements = {}, header) {
  const replacement = replacements[header.name]

  return {
    name: header.name,
    value: replacement
      ? header.value.replace(replacement.from, replacement.to)
      : header.value
  }
}
