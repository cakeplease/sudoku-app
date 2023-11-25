<template>
    <!-- DIFFICULTY LEVEL BUTTONS -->
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
        <!-- SUDOKU BOARD -->
        <ion-grid class="ion-no-padding" v-for="(row, rowIndex) in board">
                <ion-row>
                    <ion-col v-for="(num, colIndex) in row" :key=num>
                        <!-- Predefined number-cells -->
                        <ion-input v-if="!isEmptyCell(rowIndex, colIndex)" :value="num" readonly></ion-input>
                        <!-- Originally empty cells -->
                        <ion-input v-else type="number" min="1" max="9" class="empty-cells" @keydown="validate($event)" :style="{color: isInFocus }" @input="$event => updateBoard(rowIndex, colIndex, $event)" @click="event => onMarkCell(event)" :value="num === 0 ? '' : num" ></ion-input>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <p style="text-align: center">{{ $t("main.level") + ': ' + currentLevelDifficulty }}</p>
            <div class="button-wrapper">
                
                <!-- EXTRA BUTTONS -->
                <!-- Mark-button -->
                <ion-button class="mark-number" @click="toggleTextColor()" color="warning">{{ $t("main.mark_unmark_number") }}
                    <ion-icon aria-hidden="true" :icon="removeCircle"/>
                </ion-button>
                <!-- Finish level-button -->
                <ion-button :disabled="isLackingNumbers" @click="validateBoard()">
                    {{ $t("main.complete_level") }}
                    <ion-icon aria-hidden="true" :icon="trophy"/>
                </ion-button>
                <!-- Start new sudoku-button -->
                <ion-button class="start-new-sudoku" href="/tabs/play">{{ $t("main.start_new_sudoku") }}</ion-button>
            </div>
    </div>
</template>

<script setup lang="ts">
import { star, starOutline, removeCircle, trophy } from 'ionicons/icons'
import {IonGrid, IonButton, IonInput, IonIcon, IonRow, IonCol, toastController } from '@ionic/vue'
</script>

<script lang="ts">
import { Sudoku } from '@/util/Sudoku.js'

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
            emptyCellIndices: [],
        }
    },
    computed: {
        console: () => console,
        window: () => window,
    },
    methods: {

        // Validate user inputs so only 1-9 are allowed
        //From: https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
        validate(event) {
            var key = event.keyCode || event.which;
            key = String.fromCharCode(key);

            var regex = /[1-9]|/;
            if (!regex.test(key)) {
                event.returnValue = false;
                if (event.preventDefault) event.preventDefault();
            }
        },

        //When cell is clicked add deeper background color and mark this as "input" so we know what cell was clicked last when trying to mark cell later
        onMarkCell(event) {
            this.input = event.target
            const array = Array.from(document.getElementsByTagName("ion-input"))
            array.forEach(element => {
                element.setAttribute('style', 'background-color: transparent')
            });
            event.target.closest("ion-input").style = "background-color: rgba(35,35,35,0.4); color: #6dff4a"
        },

        // Get random board from internal storage with specified difficulty
        async generateSudokuGrid(difficulty: string) {
            this.currentLevelDifficulty = this.$t("main."+ difficulty) 
            let sudoku = new Sudoku()
            this.sudoku = sudoku
            let board = await this.sudoku.generate(difficulty)
    
            this.board = board
            this.emptyCellIndices = this.sudoku.emptyCellIndices
            this.isGenerated = true
        },

        //Mark uncertain number with red
        toggleTextColor() {
            if (this.input.getAttribute('data-marked') != "true") {
                this.input.setAttribute('data-marked', 'true')
                this.input.style = "color: red"
            } else {
                this.input.setAttribute('data-marked', 'false')
                this.input.style = "color: #6dff4a"
            }
        },

        // Check if the board is lacking numbers
        isBoardComplete() {
            if (this.sudoku.isBoardComplete(this.board)) {
                this.isLackingNumbers = false
            } else {
                this.isLackingNumbers = true
            }
        },

        // Update board values on cell input change
        updateBoard(rowIndex, colIndex, event) {
            if (event.target.value > 9) {
               event.target.value = 0
            }
            if (event.target.value !== '') {
               this.board[rowIndex][colIndex] = parseInt(event.target.value)
            } else {
               this.board[rowIndex][colIndex] = 0
            }
            this.isBoardComplete()
        },

        // Validate board based on sudoku rules
        validateBoard() {
            if (this.sudoku.isBoardComplete(this.board)) { //check first if there are any zeros before validating more precisely
                if (this.sudoku.validateBoard(this.board)) {
                    this.presentToast(this.$t("main.congrats"))
                } else {
                    this.presentToast(this.$t("main.try_again"))
                }
            }
        },

        // Show toast with message
        async presentToast(msg) {
            const toast = await toastController.create({
                message: msg,
                duration: 6000,
                position: 'top',
            });

            await toast.present();
        },

        // Check for empty cells in the beginning of the game for styling purposes
        isEmptyCell(row, col) {
            let mainArray = this.emptyCellIndices

            let arrayToCheck = [row, col];
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
    .empty-cells {
        color: #6dff4a
    }
    ion-col {
        background-color: #135d54;
        border: solid 1px #fff;
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
    .button-wrapper {
        display: block;
    } 

</style>