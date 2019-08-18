export function handleImage(e, property) {
  const file = e.currentTarget.files[0]
  const fileReader = new FileReader()
  let changeState = (() =>
    this.setState({
      [property]: file,
      image_preview: fileReader.result
    })).bind(this)
  fileReader.onloadend = changeState
  if (file) {
    fileReader.readAsDataURL(file)
  }
}

export function handleLoading(handledFunction) {
  this.setState({ loading: true }, () => {
    if (typeof handledFunction == 'function') {
      handledFunction()
        .finally(() => this.setState({ loading: false }))
    } else { // array (make sure to invoke the functions when passing in)
      Promise.all(handledFunction)
        .finally(() => this.setState({ loading: false }))
    }
  })
}