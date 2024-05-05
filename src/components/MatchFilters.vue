<script setup lang="ts">
import { type Ref, toRefs } from 'vue'
import type { MatchFilter } from '@/types';

const emit = defineEmits(['filtersChanged']);
const props = defineProps<{
  filters: Ref<MatchFilter[]>
}>();

// Destructure  the props
const { filters } = toRefs(props);

const onClick = (matchFilter: MatchFilter) => {
  matchFilter.checked = !matchFilter.checked
  emit('filtersChanged', matchFilter);
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
