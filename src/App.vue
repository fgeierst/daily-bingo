<script setup>
import PlayersList from './components/PlayersList.vue'
import JoinGameButton from './components/JoinGameButton.vue'
import GameBoard from './components/GameBoard.vue'

</script>

<template>
  <h1>Daily Bingo</h1>

  <PlayersList />

  <JoinGameButton />

  <GameBoard />

</template>

<style scoped>
h1 {
  margin-block-end: 2rem;
  font-size: unset;
  font-weight: bold;
}
</style>
