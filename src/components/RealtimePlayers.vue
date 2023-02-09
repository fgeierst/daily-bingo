<script setup>
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://still-sky-6595.fly.dev');
// fetch request
// Subscribe to changes only in the specified record
// pb.collection('games').subscribe('2yb5uphzlf088ps', function (e) {
//     console.log(e.record);
// });

// Unsubscribe
// pb.collection('games').unsubscribe('2yb5uphzlf088ps'); // remove all 'RECORD_ID' subscriptions
// pb.collection('games').unsubscribe('*'); // remove all '*' topic subscriptions
// pb.collection('games').unsubscribe(); // remove all subscriptions in the collection


</script>

<template>
	<h2>Realtime Players</h2>
</template>

<style scoped>

</style>