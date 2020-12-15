import { fruit } from './fruit.js'
import { snake } from './index.js'
import { z } from './buttons.js'

const r = new Image()
r.src = "rock.jpg"

export class Enemy {
  constructor(){
    this.rock = r
    this.x = Math.random() * (canvas.width - fruit.size)
    this.y = Math.random() * (canvas.height - fruit.size)
    this.size = fruit.size
    this.randomized = false
    this.collision = false
  }

  draw(ctx) {
    ctx.drawImage(this.rock, this.x, this.y, this.size, this.size)
  }

  outside(){
    while(((this.x <= 150) && (this.y >= canvas.height - 285)) || ((this.x <= 300) && (this.y <= 75))) {
      this.x = Math.random() * (canvas.width - this.size)
      this.y = Math.random() * (canvas.height - this.size)
    }
  }

  randomize() {
    for (const circ of snake.circles) {
      while ((this.x >= circ.x - 100) &&
      (this.x <= circ.x + 100) &&
      (this.y >= circ.y - 100) &&
      (this.y <= circ.y + 100)) {
        this.x = Math.random() * (canvas.width - this.size)
        this.y = Math.random() * (canvas.height - this.size)
        this.randomized = true
      }
      this.randomized = false
    }
  }  
}

export const enemies = []

export function drawEnemies (ctx, num) {
  if (enemies.length < (num - z.splicedNum)){
    const newEnemy = new Enemy()
    enemies.push(newEnemy)
    newEnemy.randomize()
    while (newEnemy.randomized) newEnemy.randomize()
    newEnemy.outside()
  }

  for (const enemy of enemies){
    enemy.outside()
    enemy.draw(ctx)
  }
}