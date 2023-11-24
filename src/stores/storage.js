import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences';

export const useStorageStore = defineStore('storage', {
  actions: {
    
    async presetData() {
      let sudokus = "{\"easy\":[{\"puzzle\":\"[[0,6,0,3,7,8,0,0,5],[0,0,4,0,0,1,9,2,0],[0,8,5,4,0,0,7,0,3],[0,3,0,0,0,4,0,7,0],[6,4,9,2,0,7,8,0,0],[0,0,7,6,0,0,0,0,0],[2,0,8,7,0,5,0,9,6],[4,0,0,0,0,0,0,5,0],[0,5,3,1,9,0,2,0,0]]\"}],\"medium\":[{\"puzzle\":\"[[0,3,0,5,0,9,0,4,0],[9,0,2,3,1,0,7,0,0],[0,0,0,0,0,6,3,0,0],[0,9,8,6,0,2,0,0,0],[2,4,0,0,0,0,9,0,0],[0,0,0,0,9,8,2,5,0],[0,0,3,0,0,0,0,0,0],[0,0,4,0,0,0,0,3,7],[8,5,9,7,4,3,0,0,0]]\"}],\"hard\":[{\"puzzle\":\"[[0,1,0,7,0,0,0,0,0],[0,0,2,0,0,0,0,7,8],[0,3,4,0,0,0,0,6,1],[0,0,0,0,0,2,9,0,0],[0,0,0,0,3,1,2,5,0],[0,0,0,5,0,0,6,0,0],[9,0,6,0,0,7,0,0,2],[0,7,0,0,0,0,0,0,0],[0,2,8,0,9,0,0,0,0]]\"}]}"

      let data = await this.get('sudokus')
      if (data.value == null) {
        await this.set('sudokus', sudokus)
      }
    },
    async get(key) {
      return await Preferences.get({ key: key })
      
    },
    async set(key, value) {
      await Preferences.set({ key: key, value: value })
    },
    async clear() {
      await Preferences.clear()
    }
  },
})