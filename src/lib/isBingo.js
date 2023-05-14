import { player } from './store.js';

// Evaluate if the game is won.
export function isBingo() {
	// Some row is checked.
	const isRowChecked = player.table.some(row => row.every(cell => cell.checked));

	// Some column is checked.
	let isColumnChecked = false;
	for (let i = 0; i < player.table.length; i++) {
		if (player.table.every(row => row[i].checked)) {
			isColumnChecked = true;
		}
	}
	const result = isRowChecked || isColumnChecked;
	return result;
}

export function countCheckedItems() {
  let count = 0;

  for (let i = 0; i < player.table.length; i++) {
    for (let j = 0; j < player.table[i].length; j++) {
      if (player.table[i][j].checked) {
        count++;
      }
    }
  }

  return count;
}
