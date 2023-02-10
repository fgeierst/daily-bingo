<script setup>
import { ref, computed } from 'vue'
import PlayersList from './components/PlayersList.vue'
import JoinGameButton from './components/JoinGameButton.vue'

const wordlist = ['Many meetings', 'Weather', 'You are muted', 'Who is next?', 'Kids sick', 'TYPO3 Update']

function randomWord() {
  return wordlist[Math.floor(Math.random() * wordlist.length)];
}

function makeRow(colums) {
  let row = [];
  for (let i = 0; i < colums; i++) {
    const cell = {
      label: randomWord(),
      checked: false
    }
    row.push(cell);
  }
  return row;
}

function makeTable(colums, rows) {
  let table = [];
  for (let i = 0; i < rows; i++) {
    table.push(makeRow(colums));
  }
  return table;
}
const table = ref(makeTable(3, 3));

const isBingo = computed(() => {
  // first row is checked
  // table.value[0].every(cell => cell.checked);

  // some row is checked
  const isRowChecked = table.value.some(row => row.every(cell => cell.checked));

  // first column is checked
  // table.value.every(row => row[0].checked);

  // some column is checked
  let isColumnChecked = false;
  for (let i = 0; i < table.value.length; i++) {
    if (table.value.every(row => row[i].checked)) {
      isColumnChecked = true;
    }
  }

  return isColumnChecked || isRowChecked;
})



</script>

<template>
  <h1 class="logo">Daily Bingo</h1>

  <PlayersList />

  <Suspense>
    <JoinGameButton />
  </Suspense>

  <table>
    <tbody>
      <tr v-for="row in table" :key="row">
        <td v-for="column in row" :key="column">
          <label :class="{ checked: column.checked }">
            {{ column.label }}
            <input type="checkbox" v-model="column.checked">
          </label>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="result" v-if="isBingo">Bingo!</div>

</template>

<style scoped>
h1 {
  margin-block-end: 2rem;
  font-size: unset;
  font-weight: bold;
}

table {
  border-collapse: collapse;
}

td {
  border: 1px solid var(--color-border);
  padding: 1rem;
}

label {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  line-height: 1;
}

label.checked {
  text-decoration: line-through;
  color: var(--color-border);
}

input {
  display: none;
}
</style>
