let canvas = (() => {
    let _ = document.createElement("canvas")
    _ = document.getElementById('canvas')
    return _ })()
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth * devicePixelRatio;
ctx.canvas.height = window.innerHeight * devicePixelRatio;

import { Snake } from './snake.js'
import { shift, space, z } from './buttons.js'
import { fruit } from './fruit.js'
import { drawEnemies } from './enemy.js'
import { display } from './display.js'
export const snake = new Snake()

shift.set();
space.set();
z.set();
setInterval(display.calcTotTime.bind(display), 1000);

function update(){
  ctx.fillStyle = 'lightgrey'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  snake.update(ctx)
  shift.move(snake.num)
  shift.draw(ctx)
  space.move()
  space.draw(ctx)
  z.ability()
  z.move()
  z.draw(ctx)
  z.abilityCollision()
  z.abitiltyCollisionCheck()
  fruit.pos()
  fruit.outside()
  fruit.draw(ctx)
  drawEnemies(ctx, snake.num)
  display.score(ctx, snake.num)
  display.color(ctx)
  display.time(ctx)
  window.requestAnimationFrame(update)
}
update()
