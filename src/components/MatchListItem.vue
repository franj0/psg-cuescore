<script setup lang="ts">
import { defineProps } from 'vue';
import type { Match } from '@/types';

defineProps({
  match: {
    type: Object as () => Match,
    required: true
  }
})

</script>
<template>
  <div class="match">
    <div class="player-a">
      {{match.playerA.name}}
    </div>
    <div class="match-result">
      {{ `${match.scoreA} - ${match.scoreB}` }}
    </div>
    <div class="player-b">
      {{match.playerB.name}}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .match {
    display: flex;
    justify-content: center;
    font-size: 18px;

    .player-a, .player-b {
      flex: 0.4;
    }
    .player-a {
      text-align: right;
    }
    .player-b {
      text-align: left;
    }
    .match-result {
      flex: 0.2;
      text-align: center;
    }
  }
</style>
