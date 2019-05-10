export function handleImage(e, property) {
  const file = e.currentTarget.files[0]
  const fileReader = new FileReader()
  let changeState = (() => this.setState({
    [property]: file,
    image_preview: fileReader.result
  })).bind(this)
  fileReader.onloadend = changeState
  if (file) {
    fileReader.readAsDataURL(file)
  }
}