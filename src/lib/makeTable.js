import { ref } from 'vue';

const wordlist = ['Many meetings', 'Weather', 'You are muted', 'Who is next?', 'Kids sick', 'TYPO3 Update'];

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

export const table = ref(makeTable(3, 3));