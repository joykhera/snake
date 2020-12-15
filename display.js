import { snake } from './index.js'
import { z } from './buttons.js'

export const display = {
  timeRemaining: 10,
  totTime: 0,
  size: 0,
  replaced: false,

  update(ctx, num){
    display.score(ctx, num)
    display.color(ctx)
    display.time(ctx)
  },

  set(){
    this.size = canvas.width / 50
  },

  score (ctx, num) {
    ctx.font = `${this.size} px Arial`
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + num, 10, 30)
  },

  remainingTime () {
    this.timeRemaining -= 0.01
    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0
    }
  },

  init () {
    setInterval(() => this.remainingTime(), 10)
  },

  color (ctx) {
    if (this.timeRemaining <= 2) {
      ctx.fillStyle = 'red'
    }
  },

  reset (num) {
    this.timeRemaining = 10 - (Math.sqrt(num) / 2)
  },

  calcTotTime(){
    this.totTime++;
  },

  time (ctx) {
    ctx.fillText('Time remaining: ' + this.timeRemaining.toFixed(2), 10, 60)
    if (this.timeRemaining <= 0 && !this.replaced) {
      location.replace(`end_screen.html?score=${snake.circles.length}&time=${this.totTime}&enemies=${z.splicedNum}`)
      this.replaced = true
    }
  }
}
display.init()
