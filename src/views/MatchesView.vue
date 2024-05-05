<script setup lang="ts">
  import apiService from '@/services/apiService'
  import { onMounted, type Ref, ref, toRaw, watchEffect } from 'vue'
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

  let allMatchesByRound = ref<{roundName: string, matches: Match[]}[]>([]);
  let matchesByRound = ref<{roundName: string, matches: Match[]}[]>([]);
  const getMatches = async () => {
    matchesByRound.value = [];
    allMatchesByRound.value = [];
    const requestUrl = 'https://api.cuescore.com/tournament/?id=42602347  ';
    const allMatches: Ref<Match[]> = ref([]);
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
    // TODO: check filters
    filterMatches(filters.value[1]);
  };

  const filters = ref<MatchFilter[]>([{
    name: 'Waiting',
    value: 'waiting',
    checked: false,
  }, {
    name: 'Playing',
    value: 'playing',
    checked: true,
  }, {
    name: 'Finished',
    value: 'finished',
    checked: false,
  }]);
  const activeFilters = ref<string[]>([]);
  const filterMatches = (matchFilter: MatchFilter) => {
    if (matchFilter.checked) {
      activeFilters.value.push(matchFilter.value)
    } else {
      activeFilters.value = activeFilters.value
        .filter((filter) => filter !== matchFilter.value);
    }
    if(!activeFilters.value.length) {
      matchesByRound.value = allMatchesByRound.value;
      return;
    }
    matchesByRound.value = allMatchesByRound.value.map(round => ({
      ...round,
      matches: round.matches.filter(match => activeFilters.value.includes(match.matchstatus))
    }));
  }
  const updateResults = () => setInterval(getMatches, 60000); // refresh data every minute

  onMounted(() => {
    getMatches();
    updateResults();
  });

</script>

<template>
  <main>
    <!--  Tournament details  -->
    <TournamentDetails :tournament="tournament" />
    <MatchFilters :filters="filters" @filtersChanged="filterMatches" />
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
