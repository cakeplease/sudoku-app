<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("main.instructions") }}</ion-title>
        <LanguageSwitch></LanguageSwitch>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t("main.welcome") }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="sudoku-rules">
        <h4>{{ $t("main.rules_heading") }}:</h4>
        <p>
          {{ $t("main.rules") }}
        </p>
        <h4>{{ $t("main.instructions") }}:</h4>
        <p style="color: #ff0000;">
          <strong>{{ $t("main.important") }}</strong>
        </p>
        <p>
          {{ $t("main.game_instructions") }}
        </p>
        
      </div>
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
  right: 20px;
  top: 20px;
}
.sudoku-rules {
  margin: 0 20px;
  line-height: 1.5;
}
</style>