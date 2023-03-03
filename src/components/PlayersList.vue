<script setup>
import { ref, onMounted } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { animals } from '../lib/animals.js';
import { players } from '../lib/store.js';

const isSubscribed = ref(false);

onMounted(async () => {
	// Fetch all players present in the database.
	try {		
		players.value = await pb.collection('players').getFullList(200, { sort: 'created', });
		
	} catch (e) {
		console.log(e);
	}
	subscribePlayerEvents();
});


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
				players.value = players.value.map(player => {
					if (player.id === e.record.id) {
						return e.record;
					} else {
						return player;
					}
				});
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
		<h2 class="visually-hidden">Players</h2> 
		
		<ul>
			<li v-for="player in players" 
				:key="player.id" 
				:class="{ isBingo: player.isBingo }"
			>
				<div class="avatar">
					<component :is="animals[player.animal]" class="animal"/>
					<p class="name">{{ Array.from(player.name)[0]  }}</p>
				</div>
				
			</li>
		</ul>
	</div>
</template>

<style scoped>
.avatar {
	display: grid;
	align-items: center;
  justify-items: center;
}

.animal {
	width: 3.5em;
	height: 3.5em;
	grid-area: 1 / 1;
}

.avatar::before {
	grid-area: 1 / 1;
	box-sizing: border-box;
	content: '';
	border: 2px solid black;
	border-radius: 50%;
	width: 2.7em;
	height: 2.7em;
}

.name {
	line-height: .7;
	text-transform: uppercase;
}


.players {
	margin-block-end: 2rem;
}

ul {
	display: flex;
	justify-content: center;
  flex-wrap: wrap;
	list-style: none;
	gap: .5rem;
	padding-inline-start: 0;
	margin-inline-end: 1rem;
}


.isBingo {
	background-color: black;
	color: white;
}

.isBingo::after {
	background-color: white;
	color: black;
}
</style>