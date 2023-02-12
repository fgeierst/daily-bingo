<script setup>
import { ref } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { player } from '../lib/store.js';

const isCreated = ref(false);
const message = ref('&nbsp');

function deletePlayerFromDatabase() {
	pb.collection('players').delete(player.id);
}

function joinGame() {
	const data = { 'name': player.name };

	pb.collection('players').create(data).then((result) => {
		player.id = result.id;
		isCreated.value = true;

		// Add callback to delete player when window is closed.
		window.addEventListener('beforeunload', deletePlayerFromDatabase);

	}).catch((error) => {
		message.value = error;
	});
}

function leaveGame() {
	// Remove beforeunload event listener.
	window.removeEventListener('beforeunload', deletePlayerFromDatabase);

	pb.collection('players').delete(player.id).then(() => {
		player.id = null;
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
				<input type="text" v-model="player.name" :disabled="isCreated">
			</label>
			<button :disabled="isCreated">Join Game</button>
		</form>

		<form @submit.prevent="leaveGame" v-show="isCreated">
			<label>Name
				<input type="text" v-model="player.name" disabled="true">
			</label>
			<button :disabled="!isCreated">Leave Game</button>
			<span class="message" v-html="message"></span>
		</form>



	</div>
</template>

<style>
.create-player {
	margin-block-end: 2rem;
	line-height: 1.7;
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