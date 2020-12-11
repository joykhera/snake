
export class Circ {
  constructor () {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.color = "black"
    this.colors = []
    this.colorAngle = Math.random() * 359 + 1
    this.size = 20
    this.normSize = 20
    this.spaceSize = 10
  }

  draw(ctx){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  collision(){
    if (this.x + this.size >= canvas.width) {
      this.x = canvas.width - this.size
    }
    if (this.x - this.size <= 0) {
      this.x = this.size
    }
    if (this.y + this.size >= canvas.height) {
      this.y = canvas.height - this.size
    }
    if (this.y - this.size <= 0) {
      this.y = this.size
    }
  }
}
