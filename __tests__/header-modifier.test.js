const { handleRequest } = require("../src/header-modifier")

describe("handleRequest()", () => {
  test("it is a function", () => {
    expect(typeof handleRequest).toBe("function")
  })

  test("it returns undefined without a config", () => {
    const request = {
      url: "foo.com",
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    }

    expect(handleRequest(request, undefined)).toEqual(undefined)
  })

  test("it replaces header contents correctly", () => {
    const request = {
      url: "foo.com",
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    }

    const config = {
      url: "foo.com",
      requestHeaders: {
        Origin: {
          from: "foo",
          to: "bar"
        }
      }
    }

    expect(handleRequest(request, config)).toEqual({
      requestHeaders: [{ name: "Origin", value: "bar.com" }],
      responseHeaders: []
    })
  })

  test("it does nothing if the url doesn't match", () => {
    const request = {
      url: "foo.com",
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    }

    const config = { url: "bar.com" }

    expect(handleRequest(request, config)).toEqual(undefined)
  })

  test("it does nothing if there's no headers configured", () => {
    const request = {
      url: "foo.com",
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    }

    const config = { url: "foo.com" }

    expect(handleRequest(request, config)).toEqual({
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    })
  })

  test("it does nothing if headers doesn't match", () => {
    const request = {
      url: "foo.com",
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    }

    const config = {
      url: "foo.com",
      requestHeaders: {
        Referer: { from: "foo", to: "bar" }
      }
    }

    expect(handleRequest(request, config)).toEqual({
      requestHeaders: [{ name: "Origin", value: "foo.com" }],
      responseHeaders: []
    })
  })
})
