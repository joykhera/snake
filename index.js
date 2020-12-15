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

fruit.set();
shift.set();
space.set();
z.set();
display.set();
setInterval(display.calcTotTime.bind(display), 1000);

function update(){
  ctx.fillStyle = 'lightgrey'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  snake.update(ctx)
  shift.update(snake.num ,ctx)
  space.update(snake.num ,ctx)
  z.update(ctx)
  fruit.update(ctx)
  drawEnemies(ctx, snake.num)
  display.update(ctx, snake.num)
  window.requestAnimationFrame(update)
}
update()

ctx.
