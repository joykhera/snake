const params = new URLSearchParams(location.search)
const score = params.get('score')
const time = params.get('time')
const enemies = params.get('enemies')

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

document.querySelector('.button.Play').addEventListener('click', play)
document.querySelector('.button.Exit').addEventListener('click', exit)

let sizeTitle = 0
let sizeSubTitle = 0


if (ctx.canvas.width == window.innerWidth && ctx.canvas.height == window.innerHeight){
    ctx.fillStyle = 'LightGray'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = `${canvas.width / 14}px Arial`
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText("Snake", canvas.width / 2, canvas.height / 5)

    ctx.font = `${canvas.width / 50}px Arial`
    ctx.fillText('Score Achieved: ' + score, canvas.width / 6, canvas.height / 3)
    ctx.fillText('Enemies destroyed: ' + enemies,canvas.width / 2, canvas.height / 3)


    let mins = Math.floor(time / 60)
    let secs = time - (mins * 60)

    if (mins < 1) ctx.fillText('Survival Duration: ' + secs + 's', (5 * canvas.width) / 6, canvas.height / 3)
    else ctx.fillText('Survival Duration: ' + mins + 'm ' + secs + 's', (3 * canvas.width) / 4, canvas.height / 3)
}


function exit(){
    window.close()
}

function play(){
    location.replace(`index.html`)
}