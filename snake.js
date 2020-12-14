import { Circ } from './circle.js'
import { display } from './display.js'
import { enemies } from './enemy.js'
import { fruit } from './fruit.js'
import { pressedKeys } from './input.js'
import { z } from './buttons.js'

export class Snake{
  constructor(){
    this.num = 1
    this.speed = 5
    this.dir = 0
    this.dirX = 1
    this.dirY = 0
    this.slow = false
    this.small = false
    this.circles = []
    this.path = []
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

  update (ctx){
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

  direction(){
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

  move(){
    const speed = this.slow ? this.speed / 2 : this.speed
    this.dir = this.direction()
    this.circles[0].x += speed * this.dir.x
    this.circles[0].y += speed * this.dir.y
    const pos = { x: this.circles[0].x, y: this.circles[0].y }
    this.path.unshift(pos)
  }

  follow(){
    const target = this.circles[0].size * 1.5
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
      let thisCirc = this.circles[this.circles.length - 1]
      let prevCirc = this.circles[this.circles.length - 2]
      
      thisCirc.colorAngle = Math.random() * 359 + 1
      while (((thisCirc.colorAngle <= prevCirc.colorAngle + 60) &&
      (thisCirc.colorAngle >= prevCirc.colorAngle - 60)) ||
      (Math.abs(thisCirc.colorAngle - prevCirc.colorAngle) > 330)){
        thisCirc.colorAngle = Math.random() * 359 + 1
      }
      thisCirc.color = `hsl(${thisCirc.colorAngle}, 100%, 50%)`
      console.log(thisCirc.colorAngle)
    }  
  }

  draw(ctx){
    for (let i = this.circles.length - 1; i >= 0; i--) {
      this.circles[i].size = this.small ? (canvas.width * 0.005) : (canvas.width * 0.01);
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
    const size = this.circles[0].size / 4
    if(this.dir.x !== 0 || this.dir.y !== 0){
      this.dirX = this.dir.x
      this.dirY = this.dir.y
    }

    let eye1 = {
      x: this.circles[0].x + (this.dirX * size) + (-this.dirY * size),
      y: this.circles[0].y + (this.dirY * size) + (this.dirX * size)
    }
    let eye2 = {
      x: this.circles[0].x + (this.dirX * size) + (this.dirY * size),
      y: this.circles[0].y + (this.dirY * size) + (-this.dirX * size)
    }

      function draw(x,y){
        ctx.beginPath()
        ctx.arc(x, y, size, 0, 2 * Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.closePath()
      }

      draw(eye1.x,eye1.y)
      draw(eye2.x,eye2.y)
  }

  eat(){
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

  collision(){
    for (const circle of this.circles) {
      circle.collision()
      for (const enemy of enemies) {
        if ((circle.x <= enemy.x + enemy.size)
        && (circle.x >= enemy.x - circle.size)
        && (circle.y <= enemy.y + enemy.size)
        && (circle.y >= enemy.y - circle.size)) 
        location.replace(`end_screen.html?score=${this.circles.length}&time=${display.totTime}&enemies=${z.splicedNum}`);
      }
    }
  }

  ability(ctx){
    z.abilityCreate()
    z.abilityDraw(ctx)
    z.abilityCollision()
  }  
}
