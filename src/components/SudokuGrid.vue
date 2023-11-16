<template>
    <div v-if="!isGenerated" class="choose-difficulty">
    <ion-button expand="full" @click=generateSudokuGrid(easy)>
            {{ $t("main.easy") }}
            <ion-icon aria-hidden="true" :icon="star"/>
            <ion-icon aria-hidden="true" :icon="starOutline"/>
            <ion-icon aria-hidden="true" :icon="starOutline"/>
        </ion-button>
        <ion-button expand="full" @click=generateSudokuGrid(medium)>
            {{ $t("main.medium") }}
            <ion-icon aria-hidden="true" :icon="star"/>
            <ion-icon aria-hidden="true" :icon="star"/>
            <ion-icon aria-hidden="true" :icon="starOutline"/>
        </ion-button>
        <ion-button expand="full" @click=generateSudokuGrid(hard)>
            {{ $t("main.hard") }}
            <ion-icon aria-hidden="true" :icon="star"/>
            <ion-icon aria-hidden="true" :icon="star"/>
            <ion-icon aria-hidden="true" :icon="star"/>
        </ion-button>
    </div>
    
    <div v-if="isGenerated" class="sudoku-wrapper">
        <ion-button class="start-new-round" href="/tabs/play">{{ $t("main.start_over") }}</ion-button>
        <h2>{{ $t("main.level") +': '+ currentLevelDifficulty }}</h2>
        <ion-grid class="ion-no-padding" v-for="(row, rowIndex) in board">
                <ion-row>
                    <ion-col v-for="(num, colIndex) in row" :key=num>
                        <ion-input v-if="!isEmptyCell(rowIndex, colIndex)" :value="num"></ion-input>
                        <ion-input v-else :style="{color: isInFocus}" @input="$event => updateBoard(rowIndex, colIndex, $event.target)" @click="$event => input = $event.target" :value="num === 0 ? '' : num"></ion-input>
                    </ion-col>
                    
                </ion-row>
            </ion-grid>
        
        <div>
            <ion-button expand="full"  class="mark-number" @click="toggleTextColor()" color="warning">{{ $t("main.mark_unmark_number") }}
                <ion-icon aria-hidden="true" :icon="removeCircle"/>
            </ion-button>
            
            <ion-button expand="full" :disabled="isLackingNumbers" @click="validateBoard()">
                {{ $t("main.complete_level") }}
            <ion-icon aria-hidden="true" :icon="trophy"/>
            </ion-button>
        </div>
        <div v-if="showResults" class="result">

            <div v-if="victory">
                <h2>{{ $t("main.congrats") }}</h2>
            </div>
            <div v-else>
                <h2>{{ $t("main.try_again") }}</h2>
            </div>

        </div>
    </div>
   
</template>

<script setup lang="ts">
import { star, starOutline, removeCircle, trophy } from 'ionicons/icons'
import {IonGrid, IonButton, IonInput, IonIcon, IonRow, IonCol} from '@ionic/vue'
</script>
<script lang="ts">
import { Sudoku } from '@/util/Sudoku.js'
//note to myself:
//when updating value of cell in board, vue generates new input
export default {
    components: { IonGrid, IonButton, IonInput, IonIcon, IonRow, IonCol },
    data() {
        return {
            easy: "easy",
            medium: "medium",
            hard: "hard",
            isGenerated: false,
            input: "",
            isInFocus: '#6dff4a',
            isLackingNumbers: true,
            currentLevelDifficulty: "",
            sudoku: "",
            board: [] as Array<Array<number>>,
            startBoard: [] as Array<Array<number>>,
            currentBoard: [] as Array<Array<number>>,
            emptyCellIndices: [],
            victory: false,
            showResults: false,
        }
    },
    computed: {
        console: () => console,
        window: () => window,
    },
    methods: {
        generateSudokuGrid(difficulty: string) {
            this.currentLevelDifficulty = difficulty 
            let sudoku = new Sudoku()
            this.sudoku = sudoku

            let board = this.sudoku.generate(difficulty)
            this.board = board
            this.emptyCellIndices = this.sudoku.emptyCellIndices
            this.isGenerated = true
        },
        toggleTextColor() {
                console.log(this.input);
                
                if (this.input.getAttribute('data-marked') != "true") {
                    this.input.setAttribute('data-marked', 'true')
                    this.input.style = "color: red"
                } else {
                    this.input.setAttribute('data-marked', 'false')
                    this.input.style = "color: #6dff4a"
                }
            
        },
        isBoardComplete() {
            if (this.sudoku.isBoardComplete(this.board)) {
                this.isLackingNumbers = false
            } else {
                this.isLackingNumbers = true
            }
        },
        
        updateBoard(rowIndex, colIndex, target) {
            this.board[rowIndex][colIndex] = parseInt(target.value) //check if is number
            this.isBoardComplete()
            console.log(target);
        },
        validateBoard() {
            this.showResults = true
            if (this.sudoku.validateBoard(this.board)) {
                this.victory = true
            }
        
        },
        isEmptyCell(row, col) {
            let mainArray = this.emptyCellIndices

            // Array to check
            let arrayToCheck = [row, col];

            // Check if the main array includes the array to check
            let includesArray = mainArray.some(subArray =>
                subArray.length === arrayToCheck.length &&
                subArray.every((value, index) => value === arrayToCheck[index])
            );

            return includesArray

        }
    }
}
</script>
<style scoped>
    ion-col {
        background-color: #135d54;
        border: solid 1px #fff;
        color: #fff;
        text-align: center;
    }

    ion-grid {
        max-width: 500px;
    }
    ion-content ion-grid:nth-of-type(3n) {
        border-bottom: 2px solid white;
    }
    ion-content ion-grid:last-of-type {
        border-bottom: none;
    }

    ion-content ion-grid ion-row ion-col:nth-child(3n) {
        border-right: 3px solid white;
    }

    ion-content ion-grid ion-row ion-col:last-child {
        border-right: none;
    }

    ion-button, ion-button.start-new-round {
        max-width: 300px;
        margin: 25px auto;
        text-align: right;
        display: block;
    }

    .sudoku-wrapper {
        max-width: 500px;
        margin: 0 auto;
    }

</style>