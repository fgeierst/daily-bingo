<script setup>
import { ref, computed } from 'vue'
import { makeTable } from '../lib/makeTable'

const table = ref(makeTable(3, 3));

const isBingo = computed(() => {

	// Some row is checked.
	const isRowChecked = table.value.some(row => row.every(cell => cell.checked));

	// Some column is checked.
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