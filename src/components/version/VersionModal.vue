<template>
  <v-dialog v-model="localVisible" width="720">
    <v-card>
      <v-card-title>{{ editing ? 'Edit Version' : 'Create Version' }}</v-card-title>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="onSave">
          <!-- Basic info -->
          <v-row>
            <v-col cols="12" sm="3">
              <v-select :items="games" v-model="form.game" label="Game" hint="GI / HSR / ZZZ" persistent-hint />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="form.version" label="Version" placeholder="6.1" required />
            </v-col>
            <v-col cols="12" sm="3">
              <v-select :items="statuses" v-model="form.status" label="Status" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.release_date" label="Release date" type="date" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.event_region_main" label="Event region (main)" placeholder="e.g. Nod-Krai" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="form.description" label="Description" rows="3" auto-grow />
            </v-col>
          </v-row>

          <v-divider class="my-3" />

          <!-- Characters rate-up -->
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1 mb-2">Characters rate-up</div>
              <v-row class="align-center" no-gutters>
                <v-col cols="12" sm="7" class="pr-sm-2">
                  <v-autocomplete
                    v-model="newCharacterName"
                    :items="characterSuggestions"
                    label="Character name"
                    clearable
                    hide-details="auto"
                    placeholder="Type to search or add custom"
                  />
                </v-col>
                <v-col cols="6" sm="3" class="pr-sm-2">
                  <v-select v-model="newCharacterRarity" :items="rarityOptions" label="Rarity" hide-details="auto" />
                </v-col>
                <v-col cols="6" sm="2">
                  <v-btn color="primary" block @click="addCharacter" :disabled="!newCharacterName">Add</v-btn>
                </v-col>
              </v-row>

              <v-row v-if="charactersList.length" class="mt-3" dense>
                <v-col cols="12" v-for="(c, idx) in charactersList" :key="idx">
                  <v-row class="align-center" no-gutters>
                    <v-col cols="7" class="pr-2">
                      <v-text-field v-model="c.name" label="Name" hide-details="auto" />
                    </v-col>
                    <v-col cols="3" class="pr-2">
                      <v-select v-model="c.rarity" :items="rarityOptions" label="Rarity" hide-details="auto" />
                    </v-col>
                    <v-col cols="2">
                      <v-btn icon="mdi-delete" color="error" variant="text" @click="removeCharacter(idx)" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div v-else class="text-caption text-medium-emphasis mt-1">No characters added yet.</div>
            </v-col>
          </v-row>

          
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="onSave">Save</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from 'vue'
import type { PropType } from 'vue'
import { CHARACTER_SUGGESTIONS } from '../../config/characterCatalog'

export default defineComponent({
  props: {
    visible: { type: Boolean as PropType<boolean>, required: true },
    model: { type: Object as PropType<any>, default: null }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const localVisible = ref(props.visible)
    const formRef = ref(null)
    const games = ['GI', 'HSR', 'ZZZ']
    const statuses = ['leak', 'confirmed', 'gone', 'no information']
    const form = reactive({ 
      game: 'GI', 
      version: '', 
      release_date: '', 
      description: '',
      event_region_main: '',
      status: 'leak',
      characters_rateup: [] as { name: string; rarity: string }[]
    })
    // Improved inputs
  const rarityOptions = ['5', '4', '5(rerun)', '4(rerun)']
    const characterSuggestions = CHARACTER_SUGGESTIONS
  const charactersList = ref<{ name: string; rarity: string }[]>([])
    const newCharacterName = ref('')
  const newCharacterRarity = ref('5')

    watch(() => props.visible, (v) => (localVisible.value = v))
    watch(() => localVisible.value, (v) => { if (!v) emit('close') })

    const editing = ref(false)

    watch(
      () => props.model,
      (v) => {
        editing.value = !!v
        if (v) {
          form.game = v.game || 'GI'
          form.version = v.version || ''
          form.release_date = v.release_date ? v.release_date.split('T')[0] : ''
          form.description = v.description || ''
           // type removed in new schema
           form.event_region_main = v.event_region_main || ''
          form.status = v.status || 'leak'
           
          // hydrate enhanced fields
          charactersList.value = Array.isArray(v.characters_rateup) ? [...v.characters_rateup] : []
        } else {
          form.game = 'GI'
          form.version = ''
          form.release_date = ''
          form.description = ''
          form.event_region_main = ''
          form.status = 'leak'
          form.characters_rateup = []
          charactersList.value = []
          newCharacterName.value = ''
          newCharacterRarity.value = '5'
        }
      },
      { immediate: true }
    )

    const addCharacter = () => {
      const name = (newCharacterName.value || '').trim()
      if (!name) return
      charactersList.value.push({ name, rarity: newCharacterRarity.value || '5★' })
      newCharacterName.value = ''
      newCharacterRarity.value = '5★'
    }

    const removeCharacter = (idx: number) => {
      charactersList.value.splice(idx, 1)
    }

    const onSave = () => {
      emit('save', { 
        ...form,
        characters_rateup: charactersList.value.filter(c => c.name?.trim()),
      })
      localVisible.value = false
    }

    return { 
      localVisible, 
      form, 
      onSave, 
      editing, 
      games, 
      statuses,
      formRef,
      // enhanced bindings
      rarityOptions,
      characterSuggestions,
      charactersList,
      newCharacterName,
      newCharacterRarity,
      addCharacter,
      removeCharacter,
    }
  }
})
</script>

