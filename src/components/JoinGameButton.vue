<script setup>
import { ref } from 'vue';
import { pb } from '../lib/pocketbase.js'

const name = ref('');
const playerId = ref('');
const isCreated = ref(false);
const message = ref('&nbsp');

async function createPlayer() {
	const data = { 'name': name.value };

	try {
		const result = await pb.collection('players').create(data);
		playerId.value = result.id;
		isCreated.value = true;
		message.value = `${name.value} (${playerId.value}) has joined the game!`

		// Set event listener to delete the player when user closes the window.
		window.onbeforeunload = async function () {
			await pb.collection('players').delete(playerId.value);
		}
	} catch (e) {
		console.error(e);
		message.value = e;
	}
}

async function removePlayer() {
	try {
		await pb.collection('players').delete(playerId.value);
		message.value = `${name.value} has left the game!`
		playerId.value = null;
		isCreated.value = false;

		// Remove the beforeunload event listener.
		window.onbeforeunload = null;
	} catch (e) {
		console.error(e);
		message.value = e;

	}
}


</script>

<template>
	<div class="create-player">

		<form @submit.prevent="createPlayer" v-show="!isCreated">
			<label>Name
				<input type="text" v-model="name" :disabled="isCreated">
			</label>
			<button :disabled="isCreated">Join Game</button>
		</form>

		<form @submit.prevent="removePlayer" v-show="isCreated">
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