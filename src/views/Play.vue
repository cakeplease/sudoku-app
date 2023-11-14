<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("main.play") }}</ion-title>
        <LanguageSwitch></LanguageSwitch>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Play</ion-title>
        </ion-toolbar>
      </ion-header>
      <SudokuGrid></SudokuGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import SudokuGrid from '@/components/SudokuGrid.vue';
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