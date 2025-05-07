<template>
    <div v-if="objectDetails && !loading" class="col-md-4">
        <div class="card mb-4">
            <img v-if="objectDetails.primaryImageSmall" :src="objectDetails.primaryImageSmall" :alt="objectDetails.title" class="card-img-top">
            <img v-else src="/src/assets/no_image.jpg" :alt="objectDetails.title" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">{{objectDetails.title}}</h5>
                <p class="card-text">{{ objectDetails.artistDisplayName }} {{ objectDetails.period }}</p>
            </div>
        </div>
    </div>
    <div v-else="loading" class="col-md-4">
        <div class="card mb-4">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>    
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getObjectDetails, type MuseumObject } from '../api/metmuseum';

interface ListProps {
    id: number;
}
const props = defineProps<ListProps>();
const objectDetails = ref<MuseumObject | undefined>(undefined);
const loading = ref(false);

const emit = defineEmits<{
  badObjectId: [badObjectId: number]
}>();

async function searchObjectDetails(objectID: number): Promise<void> {
    loading.value = true;
    const details = await getObjectDetails(objectID);
    if (details != null) {
        objectDetails.value = details;
    } else {
        emit('badObjectId', objectID);
    }
    loading.value = false;
}
searchObjectDetails(props.id);

</script>

<style lang="css" module>

</style>