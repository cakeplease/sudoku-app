import { useStorageStore } from '@/stores/storage'
const storage = useStorageStore()
export class Sudoku {
    //empty cells
    EASY = 43
    MEDIUM = 51
    HARD = 61

    constructor() {
        this.board = Array.from({ length: 9 }, () => Array(9).fill(0))
        this.emptyCellIndices = []
    }

    async generate(difficulty) {
        let sudokus = await storage.get('sudokus')
        sudokus = JSON.parse(sudokus.value)
        let len
        let randomIndex
        switch (difficulty) {
            case "easy":
                len = sudokus.easy.length
                randomIndex = Math.floor(Math.random() * len) //random sudoku from easy category
                this.board = JSON.parse(sudokus.easy[randomIndex].puzzle)
                break;
            case "medium":
                len = sudokus.medium.length
                randomIndex = Math.floor(Math.random() * len) //random sudoku from medium category
                this.board = JSON.parse(sudokus.medium[randomIndex].puzzle)
                break;
            case "hard":
                len = sudokus.hard.length
                randomIndex = Math.floor(Math.random() * len) //random sudoku from hard category
                this.board = JSON.parse(sudokus.hard[randomIndex].puzzle)
                break;
            default:
                len = sudokus.easy.length
                randomIndex = Math.floor(Math.random() * len) //random sudoku from easy category
                this.board = JSON.parse(sudokus.easy[randomIndex].puzzle)
                break;
        }
        
        this.getEmptyCellIndices(this.board)
        return this.board
    }

    //IMPORTANT: I assume that the provided board is solvable and has one unique solution!!!
    validateCustomBoard(board) {
        this.getEmptyCellIndices(board)
        let emptyCells = this.emptyCellIndices.length
        switch (emptyCells) {
            case this.EASY:
                return "easy"
            case this.MEDIUM:
                return "medium"
            case this.HARD:
                return "hard"
            default:
                throw new Error("Invalid empty cell count. Please see the instructions below for more information.")
        }
    }

    async storeBoard(board, difficulty) {
        let sudokus = await storage.get("sudokus")
        sudokus = JSON.parse(sudokus.value)
        switch (difficulty) {
            case "easy":
                sudokus.easy.push({puzzle: JSON.stringify(board)})
                break
            case "medium":
                sudokus.medium.push({ puzzle: JSON.stringify(board) })
                break
            case "hard":
                sudokus.hard.push({ puzzle: JSON.stringify(board) })
                break
            default:
                throw new Error("Invalid difficulty while storing board.")    
        }
        
        await storage.set("sudokus", JSON.stringify(sudokus))
        console.log("Added board to sudokus: ", JSON.stringify(sudokus))
    }

    solve(board) {
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
    // findSolutionCount(board) {
    //     let solutions = 0

    //     if (this.isBoardComplete(board)) {
    //         return 1
    //     }

    //     for (let row = 0; row < 9; row++) {
    //         for (let col = 0; col < 9; col++) {
    //             if (board[row][col] === 0) {
    //                 for (let num = 1; num <= 9; num++) {
    //                     if (this.isValidMove(board, row, col, num)) {
    //                         // Make the move
    //                         board[row][col] = num;

    //                         // Recursively find solutions
    //                         solutions += this.findSolutionCount(board);

    //                         board[row][col] = 0;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     // for (let row = 0; row < 9; row++) {
    //     //     for (let col = 0; col < 9; col++) {
    //     //         if (board[row][col] === 0) {
    //     //             for (let num = 1; num <= 9; num++) {
    //     //                 if (this.isValidMove(board, row, col, num)) {
    //     //                     board[row][col] = num;
    //     //                     solutions += this.findSolutionCount(board);
    //     //                     //board[row][col] = 0;
    //     //                 }
    //     //             }
    //     //         }
    //     //     }
    //     // }
    //     return solutions
    // }

    // isValidMove(board, row, col, num) {
    //     for (let i = 0; i < 9; i++) {
    //         if (num == board[row][i]) {
    //             return false
    //         } else if (num == board[i][col]) {
    //             return false
    //         //check if the number exists in subgrid
    //         } else if (num == board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3]) {
    //             return false
    //         }
    //     }

    //     return true
    // }
    
    isValidMove(board, row, col, num) {
        // Check if the number is already in the same row or column
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        // Check if the number is already in the 3x3 subgrid
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        // If the number is not present in the same row, column, or subgrid, it's a valid move
        return true;
    }

    // removeNumbers(board, difficulty) {
    //     let numbersToRemove = this.chooseDifficulty(difficulty)

    //     let row; 
    //     let col; 

    //     for (let i = 0; i<numbersToRemove; i++) {
    //         do {
    //             row = Math.floor(Math.random() * 9) // random number between 0 and 8
    //             col = Math.floor(Math.random() * 9)
    //         } while (board[row][col] === 0)
         
    //         let currentValue = board[row][col]

    //         board[row][col] = 0

    //         let boardCopy = board.map(row => row.slice())
    //         if (!this.solve(boardCopy) || this.findSolutionCount(boardCopy)>1) {
    //             board[row][col] = currentValue
    //             i--
    //         }
    //     }
    // }


    chooseDifficulty(difficulty) {
        switch (difficulty) {
            case 'easy':
                return this.EASY
            case 'medium':
                return this.MEDIUM
            case 'hard':
                return this.HARD
            default:
                return this.EASY
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

    isBoardComplete(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col <9; col++) {
                if (board[row][col] == 0) {
                    return false
                }
            }
        }
        return true
    }

    getEmptyCellIndices(board) {
        this.emptyCellIndices = []
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    let indices = [row, col]
                    this.emptyCellIndices.push(indices)
                }
            }
        }
    }

}
