<script setup>
import { ref } from 'vue';
import { pb } from '../lib/pocketbase.js'

const name = ref('');
const playerId = ref('');
const isCreated = ref(false);
const message = ref('&nbsp');

function deletePlayerFromDatabase() {
	pb.collection('players').delete(playerId.value);
}

function joinGame() {
	const data = { 'name': name.value };

	pb.collection('players').create(data).then((result) => {
		playerId.value = result.id;
		isCreated.value = true;
		// message.value = `${name.value} (${playerId.value}) has joined the game!`

		// Add callback to delete player when window is closed.
		window.addEventListener('beforeunload', deletePlayerFromDatabase);

	}).catch((error) => {
		message.value = error;
	});
}

function leaveGame() {
	// Remove beforeunload event listener.
	window.removeEventListener('beforeunload', deletePlayerFromDatabase);

	pb.collection('players').delete(playerId.value).then(() => {
		// message.value = `${name.value} has left the game!`
		playerId.value = null;
		isCreated.value = false;
	}).catch((error) => {
		message.value = error;
	});
}


</script>

<template>
	<div class="create-player">

		<form @submit.prevent="joinGame" v-show="!isCreated">
			<label>Name
				<input type="text" v-model="name" :disabled="isCreated">
			</label>
			<button :disabled="isCreated">Join Game</button>
		</form>

		<form @submit.prevent="leaveGame" v-show="isCreated">
			<label>Name
				<input type="text" v-model="name" disabled="true">
			</label>
			<button :disabled="!isCreated">Leave Game</button>
		</form>

		<p class="message" v-html="message"></p>

	</div>
</template>

<style>
.create-player {
	margin-block-end: 2rem;
}

input,
button {
	font-size: inherit;
	margin-inline-end: 1rem;
}

form {
	margin-block-end: 1rem;
}

.message {
	font-style: italic;
}
</style>