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
    this[key.replace("w","up").toLowerCase()] = true
    this[key.replace("a","left").toLowerCase()] = true
    this[key.replace("s","down").toLowerCase()] = true
    this[key.replace("d","right").toLowerCase()] = true
    this[key.replace('shift').toLowerCase()] = true
    this[key.replace('z').toLowerCase()] = true
  },
  up_handler (key = '') {
    if (key === ' ') key = 'Space'
    this[key.replace('Arrow', '').toLowerCase()] = false
    this[key.replace("w","up").toLowerCase()] = false
    this[key.replace("a","left").toLowerCase()] = false
    this[key.replace("s","down").toLowerCase()] = false
    this[key.replace("d","right").toLowerCase()] = false
    this[key.replace('shift').toLowerCase()] = false
    this[key.replace('z').toLowerCase()] = false
  }
}

document.addEventListener('keydown', (e) => pressedKeys.down_handler(e.key), false)
document.addEventListener('keyup', (e) => pressedKeys.up_handler(e.key), false)
