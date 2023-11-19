import { defineStore } from 'pinia'
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Storage, Drivers } from '@ionic/storage';


export const useStorageStore = defineStore('storage', {
  state: () => {
    return {
      loaded: false,
      store: ""
    }
  },
  actions: {
    async loadStore() {
      if (!this.loaded) {
        const store = new Storage({
          driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await store.defineDriver(CordovaSQLiteDriver);
        await store.create();
        this.store = store
        this.loaded = true
      }
    
    },
    async presetData() {
      this.isLoaded()

      fetch("./src/data/preset.json")
        .then((response) => response.json())
        .then(async (sudokus) => {
          let data = await this.get("sudokus")

          if (data == "") {
            await this.set("sudokus", sudokus)
          }
        })
        .catch((e) => console.error(e))
    },
    loadData() {

    },
    isLoaded() {
      if (!this.loaded) throw new Error('Storage is not loaded!') 
    },
    async get(key, value) {
      this.isLoaded()
      return await this.store.get(key, value);
    },
    async set(key, value) {
      this.isLoaded()
      await this.store.set(key, value);
    }
  },
})