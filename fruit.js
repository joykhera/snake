import { enemies } from './enemy.js'

const imgs = {
  apple: new Image(),
  banana: new Image(),
  orange: new Image()
}
imgs.apple.src = 'https://media.discordapp.net/attachments/437060682693738497/802404246707240991/apple.jpg?width=417&height=475'
imgs.banana.src = 'https://toppng.com/uploads/preview/banana-png-image-banana-with-no-background-11563269485bxfxxdzfxt.png'
imgs.orange.src = 'https://p1.hiclipart.com/preview/278/342/572/fruit-orange-fruit-png-clipart.jpg'

export const fruit = {
  apple: imgs.apple,
  banana: imgs.banana,
  orange: imgs.orange,
  x: Math.random() * (canvas.width),
  y: Math.random() * (canvas.height),
  size: 40,
  choose: 0,
  chosen: new Image(),

  set(){
    this.size = canvas.width * 0.02
  },

  update(ctx){
    this.pos()
    this.outside()
    this.draw(ctx)
  },

  chooseFruit(){
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

  randomize(){
    this.x = Math.random() * (canvas.width - this.size)
    this.y = Math.random() * (canvas.height - this.size)
  },

  outside(){
    while(((this.x <= 150) && (this.y >= canvas.height - 285)) || ((this.x <= 300) && (this.y <= 75))) {
      this.randomize()
    }
  },

  pos(){
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
    ctx.drawImage(this.chosen, this.x, this.y, this.size, this.size)
  }
}
fruit.chooseFruit()
