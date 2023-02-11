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
	subscribePlayerEvents();
})


// Subscribe to server-sent events of the 'players' collection.
function subscribePlayerEvents() {
	isSubscribed.value = true;
	pb.collection('players').subscribe('*', function (e) {
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
	}).then(() => {
		// Add callback to unsubscribe when window is closed.
		window.addEventListener('beforeunload', unsubscribePlayerEvents);

	}).catch((error) => {
		console.log(error);
	});
}

// Unsubscribe from server-sent events.
function unsubscribePlayerEvents() {
	pb.collection('players').unsubscribe();
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