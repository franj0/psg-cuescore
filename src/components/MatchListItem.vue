<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { Match } from '@/types';
import { MATCH_STATUS } from '@/utility/constants'

const props = defineProps({
  match: {
    type: Object as () => Match,
    required: true
  }
})

const matchStatus = computed(() => {
  const status = props.match?.matchstatus.toUpperCase();
  return status ? MATCH_STATUS[status as keyof typeof MATCH_STATUS] : undefined;
});

</script>
<template>
  <div class="match" :class="matchStatus">
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
  .finished {
    color: darkred;
  }

  .waiting {
    color: gray;
  }

  .playing {
    color: green;
  }
</style>
