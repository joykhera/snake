import { enemies } from './enemy.js'

export const fruit = {
  apple: new Image(),
  banana: new Image(),
  orange: new Image(),
  x: Math.random() * (canvas.width),
  y: Math.random() * (canvas.height),
  size: 40,
  choose: 0,
  chosen: new Image(),

  chooseFruit () {
    this.choose = Math.round(Math.random() * 2)
    switch (this.choose) {
      case 0:
        this.chosen = this.apple
        break
      case 1:
        this.chosen = this.banana
        break
      case 2:
        this.chosen = this.orange
        break
    }
  },

  randomize () {
    this.x = Math.random() * (canvas.width - this.size)
    this.y = Math.random() * (canvas.height - this.size)
  },

  pos () {
    for (let i = 0; i < enemies.length; i++) {
      if ((this.x + this.size >= enemies[i].x) &&
        (this.x <= enemies[i].x + enemies[i].size) &&
        (this.y + this.size >= enemies[i].y) &&
        (this.y <= enemies[i].y + enemies[i].size)) {
        this.randomize()
      }
    }
  },

  draw (ctx) {
    this.apple.src = 'https://cdn2.vectorstock.com/i/1000x1000/56/11/fresh-red-apple-transparent-background-vector-22385611.jpg',
    this.banana.src = 'https://toppng.com/uploads/preview/banana-png-image-banana-with-no-background-11563269485bxfxxdzfxt.png',
    this.orange.src = 'https://p1.hiclipart.com/preview/278/342/572/fruit-orange-fruit-png-clipart.jpg',
    ctx.drawImage(this.chosen, this.x, this.y, this.size, this.size)
  }
}
fruit.chooseFruit()
