const firstPlayer = document.getElementById('firstPlayer')
const secondPlayer = document.getElementById('secondPlayer')
const result = document.getElementById('res')
let currentPlayer = 'X' // Começa com o jogador X
const buttons = document.querySelectorAll('.board button')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '') {
            button.innerHTML = (currentPlayer === 'X') ? '<i class="material-icons">close</i>' : '<i class="material-icons">radio_button_unchecked</i>' 
            checkWinner()
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X' // Alternância entre X e O
        }
    })
})

function checkWinner() {
    // Coletando conteúdo de cada botão e armazenando num array
    const board = Array.from(buttons).map(button => button.textContent)

    // Uma matriz que contém todas as combinações possíveis de índices:
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6] // Diagonais
    ]

    // Analisar as condições de matrizes possíveis até parar na que tem todos os elementos iguais (vencedor)
    for (let condition of winningConditions) {
        // Verifica se o elemento no índice a existe (boolean) e depois confere se a, b, c são iguais 
        const [a, b, c] = condition // Se condition for [0, 1, 2], então a = 0, b = 1, e c = 2
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            let winnerIcon = (board[a].includes('close')) ? '<i class="material-icons">close</i>' : '<i class="material-icons">radio_button_unchecked</i>'
            result.innerHTML = `O vencedor foi ${winnerIcon}`
            disableButtons() // Desativa os botões após vitória
            return
        }
    }

    // Empate
    if (board.every(value => value !== '')) {
        result.textContent = 'Empate!'
    }
}

function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true
    })
}