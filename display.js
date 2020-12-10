import { snake } from './index.js'

export const display = {
  timeRemaining: 10,
  totTime: 0,

  score (ctx, num) {
    ctx.font = '30px Arial'
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
    ctx.font = '30px Arial'
    ctx.fillText('Time remaining: ' + this.timeRemaining.toFixed(2), 10, 60)
    if (this.timeRemaining <= 0) {
      location.replace(`end_screen.html?score=${snake.circles.length}&time=${this.totTime}`);
    }
  }
}
display.init()
