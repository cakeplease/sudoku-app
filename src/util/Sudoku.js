export class Sudoku {
    constructor() {
        this.board = Array.from({ length: 9 }, () => Array(9).fill(0))
    }

    generate(difficulty) {
        this.solve(this.board)
        this.removeNumbers(this.board, difficulty)
        return this.board
    }

    solve = (board) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num < 10; num++) {
                        if (this.isValidMove(board, row, col, num)) {
                            board[row][col] = num

                            if (this.solve(board)) {
                                return true
                            }

                            board[row][col] = 0;
                        }
                    }

                    return false
                }
            }
        }

        return true
    }

    // Board must have minimum one empty cell to be solvable
    findSolutionCount(board) {
        let solutions = 0
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidMove(board, row, col, num)) {
                            board[row][col] = num;
                            solutions += this.findSolutionCount(board);
                            board[row][col] = 0;
                        }
                    }
                }
            }
        }
        return solutions
    }

    isValidMove = (board, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (num == board[row][i]) {
                return false
            } else if (num == board[i][col]) {
                return false
            //check if the number exists in subgrid
            } else if (num == board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3]) {
                return false
            }
        }

        return true
    }

    removeNumbers(board, difficulty) {
        let numbersToRemove = this.chooseDifficulty(difficulty)

        let row; 
        let col; 

        for (let i = 0; i<numbersToRemove; i++) {
            do {
                row = Math.floor(Math.random() * 9) // random number between 0 and 8
                col = Math.floor(Math.random() * 9)
            } while (board[row][col] === 0)
         
            let currentValue = board[row][col]

            board[row][col] = 0

            let boardCopy = board.map(row => row.slice())
            if (!this.solve(boardCopy) || this.findSolutionCount(boardCopy)>1) {
                board[row][col] = currentValue
                i--
            }
        }
    }

    chooseDifficulty(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 20
            case 'medium':
                return 30
            case 'hard':
                return 40
            default:
                return 20
        }
    }

    // Each row should contain numbers from 1 to 9 without repetition
    validateArray(array) {
        if (array.length != 9) return false
        for (let i = 1; i < 10; i++) {
            if (!array.includes(i)) {
                return false
            }
        }
        return true
    }

    validateRows(board) {
        for (let i = 0; i < 9; i++) {
            let row = board[i]
            if (!this.validateArray(row)) {
                return false
            }
        }
       return true
    }

    validateColumns(board) {
        for (let col = 0; col < 9; col++) {
            let column = []
            for (let row = 0; row<9;row++) {
                column.push(board[row][col])
            }
            if (!this.validateArray(column)) {
                return false
            }
        }

        return true
    }

    validateBoxes(board) {
        for (let row = 0; row<9; row+=3) {
            for (let boxStartIndex = 0; boxStartIndex < 9; boxStartIndex += 3) {
                let box = [];
                let array1 = board[row].slice(boxStartIndex, boxStartIndex + 3)
                let array2 = board[row + 1].slice(boxStartIndex, boxStartIndex + 3)
                let array3 = board[row + 2].slice(boxStartIndex, boxStartIndex + 3)

                array1.forEach(element => {
                    box.push(element)
                })
                array2.forEach(element => {
                    box.push(element)
                })
                array3.forEach(element => {
                    box.push(element)
                })
                if (!this.validateArray(box)) {
                    return false
                }
            }
        }
       

        return true
    }

    validateBoard(board) {
        if (this.validateRows(board) && this.validateColumns(board) && this.validateBoxes(board)) {
            return true
        } else {
            return false
        }
    }

}
