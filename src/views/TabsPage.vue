<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="instructions" href="/tabs/instructions">
          <ion-icon aria-hidden="true" :icon="helpCircle" />
          <ion-label>{{ $t("main.instructions") }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="play" href="/tabs/play">
          <ion-icon aria-hidden="true" :icon="play" />
          <ion-label>{{ $t("main.play") }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/create_board">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>{{ $t("main.create_board") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { play, helpCircle, addCircle } from 'ionicons/icons';
</script>
