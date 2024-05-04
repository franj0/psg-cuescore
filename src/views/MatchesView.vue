<script setup lang="ts">
  import apiService from '@/services/apiService'
  import { onMounted, type Ref, ref, toRaw, unref, watch } from 'vue'
  import type { Match, MatchFilter, Tournament } from '@/types'
  import MatchList from '@/components/MatchList.vue'
  import MatchListItem from '@/components/MatchListItem.vue'
  import MatchFilters from '@/components/MatchFilters.vue'
  import TournamentDetails from '@/components/TournamentDetails.vue'

  const tournament = ref<Tournament>({
    id: '',
    name: '',
    discipline: '',
    owner: {
      id: '',
      name: '',
      logo: '',
      url: '',
    },
    displayDate: '',
    matches: [],
  });
  const allMatches: Ref<Match[]> = ref([]);
  const requestUrl = 'https://api.cuescore.com/tournament/?id=42068164&results=Result+list';
  const  getMatches = async () => {
    const response = await apiService.getData(requestUrl);
    tournament.value = response.data;
    allMatches.value = response.data.matches;
  };
  const filterMatches = (activeFilters: string[]) => {
    const matches = toRaw(allMatches.value);
    const filteredMatches = matches.filter((match) => activeFilters.includes(match.matchstatus));
    tournament.value.matches = filteredMatches;
  }
  onMounted(getMatches);

</script>

<template>
  <main>
    <!--  Tournament details  -->
    <TournamentDetails :tournament="tournament" />
    <MatchFilters @filtersChanged="filterMatches" />
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
