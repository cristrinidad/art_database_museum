<template>
    <div :class="$style.app">
        <div :class="$style.header">
            <Header />
        </div>
        <div :class="$style.main">
            <Main />
        </div>
        <div :class="$style.search">
            <Search @search="searchQuery"/>
        </div>
        <div :class="$style.list">
            <SearchList v-if="!loading" :objectids="listObjectIds" :searchClicked="searchClicked" :totalInvalidObj="totalInvalidObj" @badObjectId="foundBadId"/>
            <div v-else class="container card spinner-border mt-5 mb-5" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div :class="$style.footer">
            <Footer />   
        </div>
        
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Search, { type SearchQuery } from './components/Search.vue';
import SearchList from './components/SearchList.vue';
import { searchObjectIds } from './api/metmuseum';
import { ref } from 'vue';

const listObjectIds = ref<number[]>([]);
let searchClicked: boolean = false;
let totalInvalidObj: number = 0;
const loading = ref(false);

async function searchQuery(query: SearchQuery): Promise<void> {
    console.log('Search initiated for:', query);
    loading.value = true;
    const objectIds = await searchObjectIds({
        searchText : query.search,
        location: query.location,
        dateBegin: query.dateBegin,
        dateEnd: query.dateEnd,
        medium: query.medium
    });
    totalInvalidObj = 0;
    searchClicked = true;
    if (objectIds.objectIDs != null) {
        listObjectIds.value = objectIds.objectIDs;
    } else {
        listObjectIds.value = [];
    }
    loading.value = false;

    console.log('Search initiated for:', objectIds);
}

function foundBadId(id: number) {
    listObjectIds.value = listObjectIds.value.filter(objectId => objectId !== id);
    totalInvalidObj++;
    console.log(id, listObjectIds.value.length)
}

</script>

<style lang="css" module>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    top: 0px;
    left: 0px;
    background-color: #F1F0E9;
    overflow-y: auto;
}

.header {
    background-color: #4A4947;
    
}

.main {
    background-color: #FFF7D4;
}

.search {
    margin-top: 2rem;
    flex: 1;
}

.footer {
    background-color: #4A4947;
}
</style>