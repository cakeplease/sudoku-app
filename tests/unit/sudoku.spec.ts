import {Sudoku} from '@/util/Sudoku.js'

import { expect, it } from "vitest"

it("true if board is generated", () => {
    let sudoku = new Sudoku()
    let board = sudoku.generate('easy')
    console.log(board)
    expect(Array.isArray(board)).toBe(true);
})

it("true if array is valid", () => {
    let sudoku = new Sudoku()
    const testRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(sudoku.validateArray(testRow)).toBe(true)
    
})

it("false if array is invalid", () => {
    let sudoku = new Sudoku()
    const testRow = [1, 2, 3, 4, 6, 7, 8];

    expect(sudoku.validateArray(testRow)).toBe(false)

})

it("true if rows are valid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[1,2,3,4,5,6,7,8,9], [4,5,6,7,8,9,1,2,3], [7,8,9,1,2,3,4,5,6], 
    [2,1,4,3,6,5,8,9,7], [3,6,5,8,9,7,2,1,4],[8,9,7,2,1,4,3,6,5], [5,3,1,6,4,2,9,7,8], 
    [6,4,2,9,7,8,5,3,1], [9,7,8,5,3,1,6,4,2]];

    expect(sudoku.validateRows(testBoard)).toBe(true)

})

it("true if columns are valid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateColumns(testBoard)).toBe(true)

})

it("true if boxes are valid", () => {
    let sudoku = new Sudoku()

    const testBoard = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateBoxes(testBoard)).toBe(true)

})


it("false if rows are invalid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateRows(testBoard)).toBe(false)

})

it("false if columns are invalid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateColumns(testBoard)).toBe(false)

})

it("false if boxes are invalid", () => {
    let sudoku = new Sudoku()

    const testBoard = [[4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateBoxes(testBoard)).toBe(false)

})

it("true if board is valid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateBoard(testBoard)).toBe(true)

})

it("false if board is invalid", () => {
    let sudoku = new Sudoku()
    const testBoard = [[5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9, 1, 2, 3], [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7], [3, 6, 5, 8, 9, 7, 2, 1, 4], [8, 9, 7, 2, 1, 4, 3, 6, 5], [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1], [9, 7, 8, 5, 3, 1, 6, 4, 2]];

    expect(sudoku.validateBoard(testBoard)).toBe(false)

})






