<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Instructions</ion-title>
        <LanguageSwitch></LanguageSwitch>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Welcome to Sudoku app!</ion-title>
        </ion-toolbar>
      </ion-header>
      <!--TODO translate rules-->
      <h3>These are rules for playing Sudoku:</h3>
      <p>
        <ul>
          <li>Sudoku grid consists of 9x9 spaces.</li>
          <li>You can use only numbers from 1 to 9.</li>
          <li>Each 3×3 block can only contain numbers from 1 to 9.</li>
          <li>Each vertical column can only contain numbers from 1 to 9.</li>
          <li>Each horizontal row can only contain numbers from 1 to 9.</li>
          <li>Each number in the 3×3 block, vertical column or horizontal row can be used only once.</li>
          <li>The game is over when the whole Sudoku grid is correctly filled with numbers.</li>
        </ul>
        
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LanguageSwitch from '@/components/LanguageSwitch.vue';
</script>
<style scoped>
.language-switch {
  display: block;
  position: absolute;
  right: 0;
  top: 20px;
}
</style>