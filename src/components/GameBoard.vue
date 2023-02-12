<script setup>
import { watch } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { player } from '../lib/store.js';


// Push isBingo state to database.
watch(player, (newValue) => {
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

	<div class="result" v-if="player.isBingo">Bingo!</div>
</template>

<style scoped>
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