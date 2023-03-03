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
	border: 0;
	padding: var(--gap);
}

table::before {
	content:'';
	height: 100%;
  width: 100%;
	top: 0;
  position: absolute;
	background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 97 97"%3E%3Cpath stroke="%23000" stroke-linecap="round" stroke-width=".6" d="M33 .6s-2.3 33.6-2.5 57.6c-.2 24 1.7 38.4 1.7 38.4M67 .6s-2.3 33.6-2.5 57.6c-.2 24 1.7 38.4 1.7 38.4"/%3E%3Cpath stroke="%23000" stroke-linecap="round" stroke-width=".6" d="M96.4 36s-33.6-2.3-57.6-2.5C14.8 33.3.4 35.2.4 35.2m96 33.8s-33.6-2.3-57.6-2.5C14.8 66.3.4 68.2.4 68.2"/%3E%3C/svg%3E');
	background-repeat: no-repeat;
  background-size: contain;
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