<template>
    <div v-if="searchClicked" class="container card mt-5 mb-5">
        <div class="row card-header">
            <p class="card-text text-center col-sm-10 mt-2">{{ objectids.length }} items found</p>
            <Pagination :total="objectids.length" :itemsPerPage="itemsPerPage" @click="changePage" class="col-sm-2"/>
        </div>
        <div class="row card-body mt-3">
            <template v-for="objectid in pageObjectIds" :key="objectid">
                <ListItem :id ="objectid" @badObjectId="objectId => emit('badObjectId', objectId)" />
            </template>
        </div>
        <div class="row card-footer">
            <Pagination :total="objectids.length" :itemsPerPage="itemsPerPage" @click="changePage"/>
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