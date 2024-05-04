<script setup lang="ts">
import type { Tournament } from '@/types';
defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true
  }
})
</script>

<template>
  <div class="tournament-details">
    <h1>
      {{ tournament.name }}
      <span>
          {{tournament.discipline}}
        </span>
    </h1>
    <h2>{{ tournament.owner?.name }}</h2>
    <h3>{{tournament.displayDate}}</h3>
  </div>
</template>

<style scoped lang="scss">
.tournament-details {
  text-align: center;
  margin: 20px 0;
}
</style>
