export const pressedKeys = {
  up: false,
  left: false,
  right: false,
  down: false,
  shift: false,
  space: false,
  z: false,

  down_handler (key = '') {
    if (key === ' ') key = 'Space'
    this[key.replace('Arrow', '').toLowerCase()] = true
    this[key.replace('shift').toLowerCase()] = true
    this[key.replace('KeyZ').toLowerCase()] = true
  },
  up_handler (key = '') {
    if (key === ' ') key = 'Space'
    this[key.replace('Arrow', '').toLowerCase()] = false
    this[key.replace('shift').toLowerCase()] = false
    this[key.replace('KeyZ').toLowerCase()] = false
  }
}

document.addEventListener('keydown', (e) => pressedKeys.down_handler(e.key), false)
document.addEventListener('keyup', (e) => pressedKeys.up_handler(e.key), false)
