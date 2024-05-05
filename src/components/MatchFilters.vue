<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { MatchFilter } from '@/types';

const emit = defineEmits(['filtersChanged']);
const filters = ref<MatchFilter[]>([{
  name: 'Waiting',
  value: 'waiting',
  checked: false,
}, {
  name: 'Playing',
  value: 'playing',
  checked: false,
}, {
  name: 'Finished',
  value: 'finished',
  checked: false,
}]);

const activeFilters: Ref<string[]> = ref([]);

const onClick = (matchFilter: MatchFilter) => {
  matchFilter.checked = !matchFilter.checked

  if (matchFilter.checked) {
    activeFilters.value.push(matchFilter.value)
  } else {
    activeFilters.value = activeFilters.value
      .filter((filter) => filter !== matchFilter.value);
  }
  emit('filtersChanged', activeFilters.value);
}
</script>
<template>
  <main class="filters-container">
    <div v-for="(matchFilter, idx) in filters"
         :key="idx">
      <button
        class="filter-button"
        :class="{ checked: matchFilter.checked}"
        @click="onClick(matchFilter)">
        {{matchFilter.name}}
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
  .filters-container {
    display: flex;
    justify-content: right;
    gap: 10px;
    margin: 24px 0;

    .filter-button {
      padding: 8px 24px;
      border-radius: 5px;
      background: transparent;
      border: 1px solid dodgerblue;
      color: dodgerblue;
      cursor: pointer;
      &:hover {
        background: dodgerblue;
        color: white;
      }
    }
    .checked {
      background: dodgerblue;
      color: white;
    }
  }
</style>
