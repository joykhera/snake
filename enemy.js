import { fruit } from './fruit.js'
import { snake } from './index.js'
import { z } from './buttons.js'

const r = new Image()
r.src = "rock.jpg"

export class Enemy {
  constructor () {
    this.rock = r
    this.x = Math.random() * (canvas.width - fruit.size)
    this.y = Math.random() * (canvas.height - fruit.size)
    this.size = fruit.size
    this.tooClose = false;
  }

  draw (ctx) {
    ctx.drawImage(this.rock, this.x, this.y, this.size, this.size)
  }

  randomize () {
    for (const circ of snake.circles) {
      if ((this.x + this.size >= circ.x - circ.size) &&
        (this.x <= circ.x + (2 * circ.size)) &&
        (this.y + this.size >= circ.y) - circ.size &&
        (this.y <= circ.y + (2 * circ.size))) {
          this.x = Math.random() * (canvas.width - this.size)
          this.y = Math.random() * (canvas.height - this.size)
          this.tooClose = true;
      }
      this.tooClose = false;
    }
  }  
}

export const enemies = []

export function drawEnemies (ctx, num) {
  if (enemies.length < (num - z.splicedNum)){
    const newEnemy = new Enemy()
    enemies.push(newEnemy)
    while(newEnemy.tooClose) newEnemy.randomize()
  }
  for (const enemy of enemies){
    enemy.draw(ctx)  
  }
}