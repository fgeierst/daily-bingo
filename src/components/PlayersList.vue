<script setup>
import { ref, onMounted } from 'vue';
import { pb } from '../lib/pocketbase.js'

const players = ref([]);
const isSubscribed = ref(false);

onMounted(async () => {
	// Fetch all players present in the database.
	try {
		players.value = await pb.collection('players').getFullList(200, { sort: '-created', });

	} catch (e) {
		console.log(e);
	}
	subscribeToPlayers();
})


// Subscribe to server sent data events of the 'players' collection.
function subscribeToPlayers() {
	console.log('Subscribed to players...');
	isSubscribed.value = true;
	pb.collection('players').subscribe('*', function (e) {
		console.log(e.action, e.record.name);
		switch (e.action) {
			case 'create':
				players.value.push(e.record);
				break;
			case 'delete':
				players.value = players.value.filter(player => player.id !== e.record.id);
				break;
			case 'update':
				console.log('Update', e.record.name);
				break;
		}
	});
}

// Unsubscribe.
function unsubscribe() {
	pb.collection('players').unsubscribe();
	isSubscribed.value = false;
	console.log('...Unsubscribed.');
}


</script>

<template>
	<div class="players">
		<h2>Players: </h2>
		<ul>
			<li v-for="player in players" :key="player.id">
				{{ player.name }}
			</li>
		</ul>
		<button @click="subscribeToPlayers" v-show="!isSubscribed">Subscribe</button>
		<button @click="unsubscribe" v-show="isSubscribed">Unsubscribe</button>
	</div>
</template>

<style scoped>
h2 {
	font-size: inherit;
	display: inline;
}

.players {
	margin-block-end: 2rem;
}

ul {
	display: inline;
	list-style: none;
	gap: .5rem;
	padding-inline-start: 0;
	margin-inline-end: 1rem;
}

li {
	display: inline;
}

li:not(:last-child):after {
	content: ', ';
}

button {
	font-size: 70%;
}
</style>