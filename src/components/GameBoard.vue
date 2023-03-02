<script setup>
import { watch } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { player } from '../lib/store.js';


// Push isBingo state to database.
watch(player, (newValue) => {
	if (newValue.isBingo === true) {
		audioElement.play();
	}
	
	if (player.id) {
		const data = {
			"name": player.name,
			"isBingo": newValue.isBingo,
		};

		pb.collection('players').update(player.id, data).catch((error) => {
			console.log(error);
		});
	}
});

const audioElement = new Audio("bing.mp3");

</script>

<template>
	<table>
		<tbody>
			<tr v-for="row in player.table" :key="row">
				<td v-for="column in row" :key="column">
					<label :class="{ checked: column.checked }">
						{{ column.label }}
						<input type="checkbox" v-model="column.checked">
					</label>
				</td>
			</tr>
		</tbody>
	</table>

	<p class="result" v-if="player.isBingo">Bingo!</p>
	<p class="message" v-html="player.message"></p>

</template>

<style scoped>
table {
	border-collapse: collapse;
	margin-inline: auto;
	margin-block-end: var(--gap);
}

td {
	border: 1px solid var(--color-border);
	padding: var(--gap-sm);
}

label {
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	line-height: 1;
	aspect-ratio: 1/1;
  max-height: 8rem;
}

label.checked {
	text-decoration: line-through;
	color: var(--color-border);
}

input {
	display: none;
}

.message {
	color: var(--c-grey);
	text-align: center;
}
</style>