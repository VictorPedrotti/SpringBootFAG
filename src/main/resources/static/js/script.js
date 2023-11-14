//Pegando elementos do HTML
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu =  document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

//Definição de variáveis
const audio = new Audio("../assets/audio.mp3")
const size = 30;
let direction, loopId

//Definindo uma posição padrão de início
const initialPosition = [{x: 30, y: 30}, {x: 30, y: 60}]

let snake = [...initialPosition]

//Incrementar a pontuação
const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

//Gerar valores aleatórios
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})` 
}

//Gerar posições aleatórias para a fruta
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

//Desenha a comida
const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

//Desenha a cobra
const drawSnake = () => {
    ctx.fillStyle = "#7CFC00"

    snake.forEach((position, index) => {

        if(index == snake.length - 1){
            ctx.fillStyle = "#006400"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

//Move a cobra
const moveSnake = () =>  {

    if(!direction) return

    const head = snake[snake.length - 1]

    if(direction == "right"){
        snake.push({x: head.x + size, y: head.y})
    }

    if(direction == "left"){
        snake.push({x: head.x - size, y: head.y})
    }

    if(direction == "down"){
        snake.push({x: head.x, y: head.y + size})
    }

    if(direction == "up"){
        snake.push({x: head.x, y: head.y - size})
    }
    
    snake.shift();
}

//Desenha o grid
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

//Verifica se a cobra comeu a fruta
const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y){
        incrementScore()
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

//Verifica se a cobra bateu em uma parede ou nela mesma
const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision = 
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision){
        gameOver()
    }
}

//Chama a tela de game over
const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

//Ocorre a limpeza do canvas e reexecução das funções para definir a nova posição dos elementos e velocidade de execução
const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 250)
}

gameLoop()

//Coletar as teclas que estão sendo precionadas pelo usuário e tratar para a variável direção
document.addEventListener("keydown", ({key}) => {

    if((key == "ArrowRight" || key == "d" || key == "D") && direction != "left"){
        direction = "right"
    }

    if((key == "ArrowLeft" || key == "a" || key == "A") && direction != "right"){
        direction = "left"
    }

    if((key == "ArrowDown" || key == "s" || key == "S") && direction != "up"){
        direction = "down"
    }

    if((key == "ArrowUp" || key == "w" || key == "W") && direction != "down"){
        direction = "up"
    }

})

        // Coletar quando o usuário clica no botão de jogar novamente
        document.querySelector(".btn-play").addEventListener("click", () => {
            score.innerText = "00";
            menu.style.display = "none";
            canvas.style.filter = "none";
            snake = [...initialPosition];
        });
