import { Circ } from './circle.js'
import { display } from './display.js'
import { enemies } from './enemy.js'
import { fruit } from './fruit.js'
import { pressedKeys } from './pressedkeys.js'
import { z } from './buttons.js'

export class Snake {
  constructor () {
    this.num = 1
    this.speed = 5
    this.slow = false
    this.small = false
    this.circles = []
    this.path = []
    this.colorAngle = Math.random() * 359 + 1
    this.colors = []
    this.eating = false
    this.abilitySize = 0

    for (let i = 0; i < this.num; i++) {
      const circle = new Circ()
      this.circles.push(circle)
      this.circles[i].x = (this.num - i) * (this.circles[i].size * 2) + this.circles[i].size
      this.circles[0].color = 'black'
    }
  }

  update (ctx) {
    this.slow = pressedKeys.shift
    this.small = pressedKeys.space
    this.move()
    this.color()
    this.follow()
    this.draw(ctx)
    this.eyes(ctx)
    this.collision()
    this.eat()
    this.ability(ctx)
  }

  direction() {
    const vec = { x: 0, y: 0 }
    if (pressedKeys.right) vec.x += 1
    if (pressedKeys.left) vec.x -= 1
    if (pressedKeys.down) vec.y += 1
    if (pressedKeys.up) vec.y -= 1
    const m = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
    if (m !== 0) {
      vec.x /= m
      vec.y /= m
    }
    return vec
  }

  move() {
    const speed = this.slow ? this.speed / 2 : this.speed
    const dir = this.direction()
    this.circles[0].x += speed * dir.x
    this.circles[0].y += speed * dir.y
    const pos = { x: this.circles[0].x, y: this.circles[0].y }
    this.path.unshift(pos)
  }

  follow() {
    const target = this.circles[0].size * 2
    let cidx = 1
    let dist = 0
    for (let i = 1; i < this.path.length; ++i) {
      if (cidx >= this.circles.length) break
      const vx = this.path[i - 1].x - this.path[i].x
      const vy = this.path[i - 1].y - this.path[i].y
      const magnitude = Math.sqrt((vx * vx) + (vy * vy))
      dist += magnitude
      if (dist < target * cidx) continue
      const circle = this.circles[cidx]
      circle.x = this.path[i].x
      circle.y = this.path[i].y
      cidx++
    }
  }

  color(){
    if(this.eating){
      this.colorAngle = Math.random() * 359 + 1
        this.circles[this.circles.length - 1].color = `hsl(${this.colorAngle}, 100%, 50%)`
        while ((this.circles[this.circles.length - 1].colorAngle <= this.circles[this.circles.length - 2].colorAngle + 20) &&
        ((this.circles[this.circles.length - 1].colorAngle >= this.circles[this.circles.length - 2].colorAngle - 20))){
          this.circles[this.circles.length - 1].colorAngle = Math.random() * 359 + 1
      }
    }  
  }

  draw(ctx){
    for (let i = this.circles.length - 1; i >= 0; i--) {
      this.circles[i].size = this.small ? 10 : 20
      this.circles[i].draw(ctx)
      if (this.circles.length >= 2 && i >= 1){
        ctx.beginPath();
        ctx.moveTo(this.circles[i].x, this.circles[i].y);
        ctx.lineTo(this.circles[i - 1].x, this.circles[i - 1].y);
        ctx.lineWidth = this.circles[i].size * 2;
        ctx.strokeStyle = this.circles[i].color
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  eyes(ctx){
    // let eye1 = {
    //   x: this.circles[0].x,
    //   y: this.circles[0].y,
    //   size: 5,

    //   move(){
    //     if(this.circles.length >= 2){
    //       let dx = this.circles[1].x - this.circles[0].x
    //       let dy = this.circles[1].y - this.circles[0].y
    //       const m = Math.sqrt(dx * dx + dy * dy)
    //       dx /= m
    //       dy /= m
    //       this.x = dx - this.size
    //       this.y = dx - this.size
    //     }
    //   },

    //   draw(){
    //     ctx.beginPath()
    //     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    //     ctx.fillStyle = 'white'
    //     ctx.fill()
    //     ctx.closePath()
    //   },
    // }

    // let eye2 = {
    //   x: this.circles[0].x,
    //   y: this.circles[0].y,
    //   size: 5,

    //   move(){
    //     if(this.circles.length >= 2){
    //       let dx = this.circles[1].x - this.circles[0].x
    //       let dy = this.circles[1].y - this.circles[0].y
    //       const m = Math.sqrt(dx * dx + dy * dy)
    //       dx /= m
    //       dy /= m
    //       this.x = dx + this.size
    //       this.y = dx - this.size
    //     }
    //   },

    //   draw(){
    //     ctx.beginPath()
    //     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    //     ctx.fillStyle = 'white'
    //     ctx.fill()
    //     ctx.closePath()
    //   },
    // }
    // eye1.move()
    // eye1.draw()
    // eye2.move()
    // eye2.draw()
  }

  eat() {
    if ((this.circles[0].x + this.circles[0].size >= fruit.x) &&
            (this.circles[0].x - this.circles[0].size <= fruit.x + fruit.size) &&
            (this.circles[0].y + this.circles[0].size >= fruit.y) &&
            (this.circles[0].y - this.circles[0].size <= fruit.y + fruit.size)) {
      this.eating = true
      display.reset(this.num)
      this.num += 1
      this.speed += 0.25
      fruit.chooseFruit()
      fruit.randomize()
      this.circles.push(new Circ())
    }
    else{
      this.eating = false
    }
  }

  collision () {
    for (const circle of this.circles) {
      circle.collision()
      for (const enemy of enemies) {
        if ((circle.x <= enemy.x + enemy.size)
        && (circle.x >= enemy.x - circle.size)
        && (circle.y <= enemy.y + enemy.size)
        && (circle.y >= enemy.y - circle.size)) 
        location.replace(`end_screen.html?score=${this.circles.length}&time=${display.totTime}`);
      }
    }
  }

  ability(ctx){
    z.abilityCreate()
    z.abilityDraw(ctx)
    z.abilityCollision()
  }  
}
