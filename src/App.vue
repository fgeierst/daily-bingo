<script setup>
import PlayersList from './components/PlayersList.vue';
import JoinGame from './components/JoinGame.vue';
import GameBoard from './components/GameBoard.vue';

</script>

<template>
  <h1 class="title">
    Daily
    <span class="title__big">Bingo!</span>
  </h1>

  <PlayersList />

  <JoinGame />

  <GameBoard />

</template>

<style scoped>
.title {
  margin-block-start: 3rem;
  margin-block-end: 2rem;
  font-size: unset;
  font-weight: bold;
  text-align: center;
  line-height: .9;
}

.title__big {
  display: block;
  text-transform: uppercase;
  font-size: 300%;
}
</style>
