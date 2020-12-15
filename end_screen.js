const params = new URLSearchParams(location.search)
const score = params.get('score')
const time = params.get('time')
const enemies = params.get('enemies')

const mins = Math.floor(time / 60)
const secs = time - (mins * 60)
const duration = (mins < 1) ? secs + 's' : mins + 'm ' + secs + 's'

let canvas = (() => {
    let _ = document.createElement("canvas")
    _ = document.getElementById('canvas')
    return _ })()
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth * devicePixelRatio;
ctx.canvas.height = window.innerHeight * devicePixelRatio;

document.querySelector('.button.Play').addEventListener('click', play)
document.querySelector('.button.Exit').addEventListener('click', exit)

if (mins < 1) ctx.fillText('Survival Duration: ' + secs + 's', (5 * canvas.width) / 6, canvas.height / 3)
else ctx.fillText('Survival Duration: ' + mins + 'm ' + secs + 's', (3 * canvas.width) / 4, canvas.height / 3)


function draw() {

    ctx.fillStyle = 'LightGray'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.font = `${canvas.width / 14}px Arial`
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText("Snake", canvas.width / 2, canvas.height / 5)
    
    ctx.font = `${canvas.width / 50}px Arial`
    ctx.fillText('Score Achieved: ' + score, canvas.width / 6, canvas.height / 3)
    ctx.fillText('Enemies destroyed: ' + enemies,canvas.width / 2, canvas.height / 3)
    ctx.fillText('Survival Duration: ' + duration, (3 * canvas.width) / 4, canvas.height / 3)

    
}
draw()





function exit(){
    window.close()
}

function play(){
    location.replace(`index.html`)
}