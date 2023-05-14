<script setup>
import { ref, onMounted } from 'vue';
import { pb } from '../lib/pocketbase.js';
import { messages, messagesToDisplay } from '../lib/store.js';
import parrot from '~icons/noto/parrot';

onMounted(async () => {
	subscribeChatEvents();
});

// Subscribe to server-sent events of the 'chat' collection.
function subscribeChatEvents() {
	pb.collection('chat').subscribe('*', function (e) {
		switch (e.action) {
			case 'create':
				messages.value.unshift(e.record);
				break;
		}
	}).then(() => {
		// Add callback to unsubscribe when window is closed.
		window.addEventListener('beforeunload', unsubscribeChatEvents);

	}).catch((error) => {
		console.log(error);
	});
}

// Unsubscribe from server-sent events.
function unsubscribeChatEvents() {
	pb.collection('chat').unsubscribe();
}

</script>

<template>
	<div class="container">
		<ul>
			<li 
				v-for="message in messagesToDisplay" 
				:key="message.message"
				v-bind:style="{ '--rotation': ((Math.random() * 4) - 2).toFixed(2) + 'deg' }"
				v-motion
						:initial="{
							scale: 0,
							opacity: 0,
						}"
						:enter="{
							scale: 1,
							opacity: 1,
							transition: {
								type: 'spring',
								stiffness: 300,
								damping: 5,
								mass: .8,
							},
						}"
			>
				{{ message.message }}
			</li>
		</ul>

		<component :is="parrot" class="animal"/>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: .5rem;
}
.animal {
	width: 3.5em;
	height: 3.5em;
	align-self: flex-end;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

li {
	background-color: white;
	outline: 2px solid;
	font-size: 14px;
	font-weight: 300;
	padding: .2rem;
	border-radius: .7rem;
	transform: rotate(var(--rotation));
	max-width: 20ch;
}

</style>