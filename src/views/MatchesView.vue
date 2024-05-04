<script setup lang="ts">
  import apiService from '@/services/apiService'
  import { onMounted, ref } from 'vue'
  import type { Tournament } from '@/types';
  import MatchList from '@/components/MatchList.vue'
  import MatchListItem from '@/components/MatchListItem.vue'

  const tournament = ref<Tournament>({ matches: []});
  const requestUrl = 'https://api.cuescore.com/tournament/?id=42068164&results=Result+list';
  const  getMatches = async () => {
    const response = await apiService.getData(requestUrl);
    tournament.value = response.data;
  };
  onMounted(getMatches);
</script>

<template>
  <main>
    <!--  TITLE  -->
    <h1>Matches</h1>
    <!--  LIST OF MATCHES  -->
    <MatchList>
      <template #default>
        <MatchListItem v-for="(match, idx) in tournament.matches"
                       :key="idx"
                       :match="match"/>
      </template>
    </MatchList>
  </main>
</template>
