const params = new URLSearchParams(location.search)
const score = params.get('score')
const time = params.get('time')

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.fillStyle = 'LightGray'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.font = '100px Arial'
ctx.fillStyle = 'black'
ctx.textAlign = 'center'
ctx.fillText("Snake", canvas.width / 2, canvas.height / 4)

ctx.font = '30px Arial'
ctx.textAlign = 'center'
ctx.fillText('Score Achieved: ' + score, canvas.width / 4, canvas.height / 3)

ctx.font = '30px Arial'
ctx.textAlign = 'center'
ctx.fillText('Survival Duration: ' + time + 's', (3 * canvas.width) / 4, canvas.height / 3)

document.querySelector('.button.Play').addEventListener('click', play)
document.querySelector('.button.Exit').addEventListener('click', exit)

function exit(){
    window.close()
}

function play(){
    location.replace(`snake.html`)
}