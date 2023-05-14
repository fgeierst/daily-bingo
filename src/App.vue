<script setup>
import PlayersList from './components/PlayersList.vue';
import JoinGame from './components/JoinGame.vue';
import GameBoard from './components/GameBoard.vue';
import AiParrot from './components/AiParrot.vue';

</script>

<template>

  <main>
    <h1 class="title">
      Daily
      <span class="title__big">Bingo!</span>
    </h1>

    <PlayersList />
    <JoinGame />
    <GameBoard />
  </main>

  <aside class="parrot">
    <AiParrot />
  </aside>

</template>

<style scoped>
.parrot {
  position: fixed;
  bottom: 0;
  right: .5rem;
}
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
