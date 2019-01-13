document.addEventListener("input", event => {
  if (event.target.tagName !== "INPUT") return
  console.log(event.target.name, event.target.value)
})
