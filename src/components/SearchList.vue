<template>
    <div v-if="searchClicked" class="container card mt-5 mb-5">
        <div class="row card-header">
            <p v-if="totalInvalidObj === 0" class="card-text text-center col-sm-10 mt-2">{{ objectids.length }} items found</p>
            <p v-else class="card-text text-center col-sm-10 mt-2">{{ objectids.length }} items found ({{ totalInvalidObj }} invalid items found)</p>
            <Pagination :total="objectids.length" :itemsPerPage="itemsPerPage" :selectedPage="currentPageNumber" @click="changePage" class="col-sm-2"/>
        </div>
        <div class="row card-body mt-3">
            <template v-if="props.objectids.length == 0">
                <p>No Items</p>
            </template>
            <template v-else v-for="objectid in pageObjectIds" :key="objectid">
                <ListItem :id ="objectid" @badObjectId="objectId => emit('badObjectId', objectId)" />
            </template>
        </div>
        <div class="row card-footer">
            <Pagination :total="objectids.length" :itemsPerPage="itemsPerPage" :selectedPage="currentPageNumber" @click="changePage"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ListItem from './ListItem.vue';
import Pagination from './Pagination.vue';
const itemsPerPage = 30;
const currentPageNumber = ref(1);

interface ListProps {
    searchClicked: boolean;
    objectids: number[];
    totalInvalidObj: number;
}

const emit = defineEmits<{
  badObjectId: [badObjectId: number]
}>();

const props = defineProps<ListProps>();

const pageObjectIds = computed(() => {
    return props.objectids.slice((currentPageNumber.value * itemsPerPage) - itemsPerPage, currentPageNumber.value * itemsPerPage);
});

function changePage(page: number) {
    currentPageNumber.value = page;
}
</script>

<style scoped>

</style>