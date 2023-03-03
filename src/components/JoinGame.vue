<script setup>
import { ref } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { player, players } from '../lib/store.js';
import { getRandomAnimal } from '../lib/animals.js';

const isCreated = ref(false);

function deletePlayerFromDatabase() {
	pb.collection('players').delete(player.id);
}

function joinGame() {
	if (player.name < 3) {
		player.message = 'Please enter a name of at least 3 characters.';
		return;
	}

	player.animal = getRandomAnimal();
	
	const data = {
		'name': player.name,
		'animal': player.animal,
	};

	pb.collection('players').create(data).then((result) => {		
		player.id = result.id;
		isCreated.value = true;

		// Add callback to delete player when window is closed.
		window.addEventListener('beforeunload', deletePlayerFromDatabase);

		// Clean up idle players.
		cleanUpIdlePlayers(new Date(result.updated));

	}).catch((error) => {
		player.message = error;
	});
}

function cleanUpIdlePlayers(serverDate) {
	players.value.forEach(player => {
		const playerUpdated = new Date(player.updated);
		const idleMinutes = Math.floor((Math.abs(serverDate - playerUpdated) / 1000) / 60);
		if (idleMinutes > 15) {
			pb.collection('players').delete(player.id).then(() => {
				console.log('Removed ' + player.name + " (idle for " + idleMinutes + " minutes).");
			}).catch((error) => {
				console.log(error);
			});
		}
	});	
}

function leaveGame() {
	// Remove beforeunload event listener.
	window.removeEventListener('beforeunload', deletePlayerFromDatabase);

	pb.collection('players').delete(player.id).then(() => {
		player.id = null;
		isCreated.value = false;
	}).catch((error) => {
		player.message = error;
	});
}

</script>

<template>
	<div class="create-player">

		<form @submit.prevent="joinGame" v-show="!isCreated">
			<label>Name
				<input type="text" v-model="player.name" :disabled="isCreated" minlength="3" maxlength="20">
			</label>
			<button :disabled="isCreated">Join Game</button>
		</form>

		<form @submit.prevent="leaveGame" v-show="isCreated">
			<label>Name
				<input type="text" v-model="player.name" disabled="true">
			</label>
			<button :disabled="!isCreated">Leave Game</button>
		</form>

	</div>
</template>

<style>
.create-player {
	margin-block-end: 2rem;
	line-height: 1.7;
	text-align: center;
}

input {
	margin-inline-end: 1rem;
}


form {
	margin-block-end: 1rem;
}
</style>