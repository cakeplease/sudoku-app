<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("main.create_board") }}</ion-title>
        <LanguageSwitch></LanguageSwitch>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("main.create_board") }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="sudoku-wrapper">

        <!-- Show empty cell count -->
        <ion-label>{{ $t("main.empty_cells") }}: {{ emptyCells }} </ion-label>

        <!-- Empty board -->
        <ion-grid class="ion-no-padding" v-for="(row, rowIndex) in board">
            <ion-row>
                <ion-col v-for="(num, colIndex) in row" :key=num>
                    <ion-input @input="$event => updateBoard(rowIndex, colIndex, $event.target)" :value="num === 0 ? '' : num" type="number" @keydown="validate($event)"></ion-input>
                </ion-col>
            </ion-row>
          </ion-grid>
          <!-- Add board button -->
          <ion-button @click="addBoard()">{{ $t("main.save_board") }}</ion-button>

          <!-- Instructions -->
          <ion-title>{{ $t("main.board_levels") }}:</ion-title>
          <ion-list>
            <ion-item><ion-label>{{ $t("main.board_level_easy") }}</ion-label></ion-item>
            <ion-item><ion-label>{{ $t("main.board_level_medium") }}</ion-label></ion-item>
            <ion-item><ion-label>{{ $t("main.board_level_hard") }}</ion-label></ion-item>
          </ion-list>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButton, IonInput, IonRow, IonCol, IonList, IonItem, IonLabel } from '@ionic/vue'
</script>

<script lang="ts">
  import { Sudoku } from '@/util/Sudoku'
  import { toastController } from '@ionic/vue'
  import LanguageSwitch from '@/components/LanguageSwitch.vue';


  let sudoku = new Sudoku()
  export default {
    data() {
      return {
        emptyCells: 81,
        board: sudoku.board as Array<Array<number>>,
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

      // Show toast with message
      async presentToast(msg) {
        const toast = await toastController.create({
          message: msg,
          duration: 6000,
          position: 'top',
        });

        await toast.present();
      },

      // Update board values on cell update
      updateBoard(rowIndex, colIndex, target) {
        if (target.value > 9) {
           target.value = 0
          }
          if (target.value !== '') {
            this.board[rowIndex][colIndex] = parseInt(target.value) //check if is number
          } else {
            this.board[rowIndex][colIndex] = 0
          }
          
          sudoku.getEmptyCellIndices(this.board)
          this.emptyCells = sudoku.emptyCellIndices.length
      },
      // Add board to internal storage with other start boards
      async addBoard() {
        try {
         let difficulty = sudoku.validateCustomBoard(this.board)
         await sudoku.storeBoard(this.board, difficulty)
         this.presentToast(this.$t("main.board_added"))
        } catch (error) {
          this.presentToast(this.$t("main.invalid_cell_count"))
          console.error(error)
        }
      },
    }
  }

</script>
<style scoped>
  .language-switch {
    display: block;
      position: absolute;
      right: 20px;
      top: 20px;
  }
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