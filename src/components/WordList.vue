<script setup>
import { ref, computed } from 'vue';
import { pb } from '../lib/pocketbase.js';

const { items } = await pb.collection('wordlists').getList();

const selected = ref(items[0].id);

const wordlist = computed(() => items.filter(item => item.id === selected.value)[0]?.list);

function logWordlist() { console.log(wordlist.value); }

</script>

<template>
	<div class="wordlist-select">
		<label>Select Wordlist
			<select v-model="selected" @input="logWordlist">
				<option v-for="item in items" :key="item.id" :value="item.id">
					{{ item.label }}
				</option>
			</select>
		</label>
	</div>
</template>

<style scoped>
.wordlist-select {
	padding-block: 1rem;
	color: #ccc;
	font-style: italic;
}

label {
	display: flex;
	flex-direction: row;
	gap: 1rem;
}

select {
	font-size: inherit;
	color: inherit;
	border-color: currentColor;
	font-style: inherit;
}
</style>