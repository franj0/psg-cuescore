<script setup lang="ts">
  import apiService from '@/services/apiService'
  import { onMounted, type Ref, ref, toRaw} from 'vue'
  import type { Match, Tournament } from '@/types'
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
  let allMatchesByRound = ref<{roundName: string, matches: Match[]}[]>([]);
  const requestUrl = 'https://api.cuescore.com/tournament/?id=42068164  ';
  const matchesByRound = ref<{roundName: string, matches: Match[]}[]>([]);
  const getMatches = async () => {
    const response = await apiService.getData(requestUrl);
    tournament.value = response.data;
    allMatches.value = response.data.matches;

    const roundNames: string[] = [];
    allMatches.value.forEach((match) => {
      if (!roundNames.includes(match.roundName)) {
        roundNames.push(match.roundName);
      }
    });
    roundNames.forEach((name) => {
      matchesByRound.value.push({
        roundName: name,
        matches: allMatches.value.filter((match) => match.roundName === name),
      });
    });
    allMatchesByRound.value = [...matchesByRound.value];
  };
  const filterMatches = (activeFilters: string[]) => {
    if(!activeFilters.length) {
      matchesByRound.value = allMatchesByRound.value;
      return;
    }
    matchesByRound.value = allMatchesByRound.value.map(round => ({
      ...round,
      matches: round.matches.filter(match => activeFilters.includes(match.matchstatus))
    }));
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
        <div v-for="(round, key) in matchesByRound" :key="key">
          <h2>{{round.roundName}}</h2>
          <MatchListItem v-for="(match, idx) in round.matches"
                         :key="idx"
                         :match="match"/>
        </div>
      </template>
    </MatchList>
  </main>
</template>
