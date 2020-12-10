import { pressedKeys } from './pressedKeys.js'
import { snake } from './index.js'
import { enemies } from './enemy.js'

export const shift = {
  x: 10,
  y: canvas.height - 155,
  sizeX: 50,
  sizeY: 150,
  borderSize: 2,
  moverSpeed: 5,
  moverY: canvas.height - 155,
  moverSizeY: 150,

  set(){
    this.y = canvas.height - 155
    this.moverY = this.y
  },

  move (num) {
    this.moverSpeed = 5 / (num / 2)
    if (pressedKeys.shift && this.moverSizeY >= this.borderSize && this.moverY >= this.y - this.moverSizeY) {
      this.moverSizeY -= this.moverSpeed
      this.moverY += this.moverSpeed
    } else if (!pressedKeys.shift && this.moverSizeY <= this.sizeY - this.borderSize && this.moverY >= this.y) {
      this.moverSizeY += this.moverSpeed
      this.moverY -= this.moverSpeed
    }

    if (this.moverSizeY <= this.borderSize) {
      pressedKeys.shift = false
    }
  },

  draw (ctx) {
    ctx.fillStyle = 'black'
    ctx.font = this.sizeX / 2 + 'px Arial'
    ctx.fillText('Shift', this.x, this.y - this.sizeX / 4)
    ctx.fillStyle = 'orange'
    ctx.fillRect(this.x, this.moverY, this.sizeX, this.moverSizeY)
    ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY)
  }
}

export const space = {
  x: shift.x + shift.sizeX + 20,
  y: shift.y,
  sizeX: shift.sizeX,
  sizeY: shift.sizeY,
  borderSize: shift.borderSize,
  moverSpeed: shift.moverSpeed,
  moverY: shift.moverY,
  moverSizeY: shift.moverSizeY,

  set(){
    this.y = shift.y
    this.moverY = this.y
  },

  move () {
    this.moverSpeed = shift.moverSpeed
    if (pressedKeys.space && this.moverSizeY >= this.borderSize && this.moverY >= this.y - this.moverSizeY) {
      this.moverSizeY -= this.moverSpeed
      this.moverY += this.moverSpeed
    } else if (!pressedKeys.space && this.moverSizeY <= this.sizeY - this.borderSize && this.moverY >= this.y) {
      this.moverSizeY += this.moverSpeed
      this.moverY -= this.moverSpeed
    }

    if (this.moverSizeY <= this.borderSize) {
      pressedKeys.space = false
    }
  },

  draw (ctx) {
    ctx.fillStyle = 'black'
    ctx.font = this.sizeX / 2 + 'px Arial'
    ctx.fillText('Space', this.x, this.y - this.sizeX / 4)
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.x, this.moverY, this.sizeX, this.moverSizeY)
    ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY)
  }
}

export const z = {
  x: shift.x,
  y: shift.y - 100,
  sizeX: 50,
  sizeY: 50,
  borderSize: shift.borderSize,
  moverY: shift.y - 100,
  moverSizeY: 50,
  abilityCounter: 0,
  count: 0,
  reset: false,
  abilityOn: false,
  abilityX: canvas.width / 2,
  abilityY: canvas.height / 2,
  abilitySize: 0,
  grow: false,
  collisionCheck1: false,
  collisionCheck2: false,

  set(){
    this.y = shift.y - 100
    this.moverY = this.y
  },

  ability(){
    if (!this.reset && snake.eating) this.count++
    this.abilityCounter = this.count % 6
  },

  move() {
    this.moverY = (this.y + this.sizeY) - (this.sizeY * this.abilityCounter / 5 )
    this.moverSizeY = (this.sizeY) * this.abilityCounter / 5

    if (this.abilityCounter < 4) pressedKeys.z = false
    if (this.abilityCounter == 5) this.reset = true
    if (pressedKeys.z && this.reset){
      this.count = 0
      this.reset = false
      this.abilityOn = true
    }
    else this.abilityOn = false
  },

  draw (ctx) {
    ctx.fillStyle = 'black'
    ctx.font = this.sizeX / 2 + 'px Arial'
    ctx.fillText('Z', this.x, this.y - this.sizeX / 4)
    ctx.fillStyle = 'green'
    ctx.fillRect(this.x, this.moverY, this.sizeX, this.moverSizeY)
    ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY)
  },

  abilityCreate(){
    this.abilityX = snake.circles[0].x
    this.abilityY = snake.circles[0].y
    if (this.abilityOn) this.grow = true
  },

  abilityDraw(ctx){
    if (this.grow){
      this.abilitySize += 5
      ctx.beginPath()
      ctx.arc(this.abilityX, this.abilityY, this.abilitySize, 0, 2 * Math.PI)
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.closePath()
    }
    if(this.abilitySize > 100){
      this.grow = false
      this.abilitySize = 0
    }
  },

  abilityCollision(){
    if(this.grow){
      for (let i = 0; i < enemies.length; i++){
        let distX = Math.abs(this.abilityX - enemies[i].x - enemies[i].size / 2);
        let distY = Math.abs(this.abilityY - enemies[i].y - enemies[i].size / 2);

        if (distX > (enemies[i].size / 2) + this.abilitySize) this.collisionCheck1 = false
        if (distY > (enemies[i].size / 2) + this.abilitySize) this.collisionCheck1 = false
        if (distX <= (enemies[i].size / 2)) this.collisionCheck1 = true
        if (distY <= (enemies[i].size / 2)) this.collisionCheck1 = true

        let centerEnemyX = distX - (enemies[i].size / 2);
        let centerEnemyY = distY - (enemies[i].size / 2);

        if ((centerEnemyX * centerEnemyX) + (centerEnemyY * centerEnemyY) < 
        (this.abilitySize * this.abilitySize)) this.collisionCheck2 = true
        else this.collisionCheck2 = false
        if (this.collisionCheck1 && this.collisionCheck2) {
          enemies.splice(i, 1)
          console.log("hit")
        }
      }
    }
  },
}    