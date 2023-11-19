<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("main.create_board") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("main.create_board") }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="sudoku-wrapper">
        <ion-label>{{ $t("main.empty_cells") }}: {{ emptyCells }} </ion-label>

        <ion-grid class="ion-no-padding" v-for="(row, rowIndex) in board">
            <ion-row>
                <ion-col v-for="(num, colIndex) in row" :key=num>
                    <ion-input @input="$event => updateBoard(rowIndex, colIndex, $event.target)" :value="num === 0 ? '' : num"></ion-input>
                </ion-col>
            </ion-row>
          </ion-grid>
          <ion-button @click="addBoard()">{{ $t("main.save_board") }}</ion-button>
          <ion-label v-if="success">{{ $t("main.board_added") }}</ion-label>
          <ion-label v-if="error">{{ $t("main.invalid_cell_count") }}</ion-label>
          <ion-title>Board difficulty levels:</ion-title>
          <ion-list>
            <ion-item><ion-label>Easy: 20 empty cells</ion-label></ion-item>
            <ion-item><ion-label>Medium: 30 empty cells</ion-label></ion-item>
            <ion-item><ion-label>Hard: 40 empty cells</ion-label></ion-item>
          </ion-list>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButton, IonInput, IonRow, IonCol, IonList, IonItem, IonLabel } from '@ionic/vue'
</script>

<script lang="ts">
  import { useStorageStore } from '@/stores/storage'
  import { Sudoku } from '@/util/Sudoku'
  const storage = useStorageStore()
  let sudoku = new Sudoku()
  export default {
    data() {
      return {
        feedback: "",
        emptyCells: 81,
        board: sudoku.board as Array<Array<number>>,
        success: false,
        error: false,
      }
    },
    computed: {
      console: () => console,
      window: () => window,
    },
    methods: {
      updateBoard(rowIndex, colIndex, target) {
        if (target.value !== '') {
          this.board[rowIndex][colIndex] = parseInt(target.value) //check if is number
        } else {
          this.board[rowIndex][colIndex] = 0
        }
        
        sudoku.getEmptyCellIndices(this.board)
        this.emptyCells = sudoku.emptyCellIndices.length
      },
      async addBoard() {
        try {
         let difficulty = sudoku.validateCustomBoard(this.board)
         await sudoku.storeBoard(this.board, difficulty)
         this.success = true
        } catch (error) {
         this.error = true
         console.error(error)
        }
      },
      async set() {
        storage.set("test", "test")
      },
      async get() {
       storage.get("test")
      }
    }
  }

</script>
<style scoped>
  .sudoku-wrapper {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px 0;
  }
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

  ion-button,
  ion-button.start-new-round {
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