import cow from '~icons/noto/cow';
import cat from '~icons/noto/cat';
import deer from '~icons/noto/deer';
import dog from '~icons/noto/dog';
import fox from '~icons/noto/fox';
import horse from '~icons/noto/horse';
import mouse from '~icons/noto/mouse';
import rabbit from '~icons/noto/rabbit';
import ram from '~icons/noto/ram';
import panda from '~icons/noto/panda';
import monkey from '~icons/noto/monkey';

export const animals = {
	cow: cow,
	cat: cat,
	deer: deer,
	dog: dog,
	fox: fox,
	horse: horse,
	mouse: mouse,
	rabbit: rabbit,
	ram: ram,
	panda: panda,
	monkey: monkey,
};

export function getRandomAnimal() {
	const randomIndex = Math.floor(Math.random() * Object.keys(animals).length);
	return Object.keys(animals)[randomIndex];
}