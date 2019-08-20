export const RECEIVE_FLASH = "RECEIVE_FLASH"
export const CLEAR_FLASH = "CLEAR_FLASH"

export const receiveFlash = messages => ({
  type: RECEIVE_FLASH,
  messages
})

export const clearFlash = () => ({
  type: CLEAR_FLASH
})