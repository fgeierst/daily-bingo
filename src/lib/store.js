import { reactive, computed } from 'vue';
import { makeTable } from './makeTable.js';
import { isBingo } from './isBingo.js';

export const player = reactive({
	name: '',
	id: '',
	table: makeTable(3, 3),
	isBingo: computed(isBingo),
});

