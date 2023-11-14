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

    <div v-else>
        <ion-button href="/tabs/play">{{ $t("main.start_over") }}</ion-button>
    </div>
    

    <ion-grid v-if="isGenerated" class="ion-no-padding" v-for="row in board">
        <ion-row>
            <ion-col v-for="num in row">
                <ion-input v-if="num!=0" :value="num"></ion-input>
                <ion-input v-else :value="''"></ion-input>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup lang="ts">
import { star, starOutline } from 'ionicons/icons'
</script>
<script lang="ts">
import { Sudoku } from '@/util/Sudoku.js'
export default {
    data() {
        return {
            easy: "easy",
            medium: "medium",
            hard: "hard",
            board: [] as Array<Array<number>>,
            isGenerated: false
        }
    },
    methods: {
        generateSudokuGrid(difficulty: string) {
            let sudoku = new Sudoku()
            this.board = sudoku.generate(difficulty)
            this.isGenerated = true
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
        border-bottom: 3px solid white;
    }
    ion-content ion-grid:last-of-type {
        border-bottom: none;
    }

    ion-content ion-grid ion-row ion-col:nth-child(3n) {
        border-right: 4px solid white;
    }

    ion-content ion-grid ion-row ion-col:last-child {
        border-right: none;
    }

    ion-button {
        max-width: 300px;
        margin: 25px auto;
        text-align: right;
        
    }

</style>