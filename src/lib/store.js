import { reactive, computed, ref } from 'vue';
import { makeTable } from './makeTable.js';
import { isBingo, countCheckedItems } from './isBingo.js';

export const player = reactive({
	name: '',
	id: '',
	table: makeTable(3, 3),
	count: computed(countCheckedItems),
	isBingo: computed(isBingo),
	animal: '',
	message: '',
});

export const players = ref([]);
export const messages = ref([]);

export const messagesToDisplay = computed(() => {
	return messages.value.slice(0, 1);
});