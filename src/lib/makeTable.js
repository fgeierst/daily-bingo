const wordlist = ['Many meetings', 'Weather', 'You are muted', 'Who is next?', 'Kids sick', 'TYPO3 Update', 'Spooning aggressivly', 'Cat'];


function randomWord() {
	const randomIndex = Math.floor(Math.random() * wordlist.length);
	const [word] = wordlist.splice(randomIndex, 1);
	return word;
}

function makeRow(colums) {
	let row = [];
	for (let i = 0; i < colums; i++) {
		const cell = {
			label: randomWord(),
			checked: false
		};
		row.push(cell);
	}
	return row;
}

export function makeTable(colums, rows) {
	let table = [];
	for (let i = 0; i < rows; i++) {
		table.push(makeRow(colums));
	}
	return table;
}
