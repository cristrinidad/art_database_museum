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
            <SearchList :objectids="listObjectIds" :searchClicked="searchClicked" :totalInvalidObj="totalInvalidObj" @badObjectId="foundBadId"/>
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
let totalObj: number = 0;
let searchClicked: boolean = false;
let totalInvalidObj: number = 0;

async function searchQuery(query: SearchQuery): Promise<void> {
    console.log('Search initiated for:', query);
    const objectIds = await searchObjectIds({
        searchText : query.search,
        location: query.location,
        dateBegin: query.dateBegin,
        dateEnd: query.dateEnd,
        medium: query.medium
    });
    totalInvalidObj = 0;
    totalObj = objectIds.total;
    searchClicked = true;
    if (objectIds.objectIDs != null) {
        listObjectIds.value = objectIds.objectIDs;
    } else {
        listObjectIds.value = [];
    }

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
    background-color: #EFEFEF;
    overflow-y: auto;
}

.header {
    background-color: #EF9651;
}

.main {
    background-color: #3F7D58;
}

.search {
    margin-top: 2rem;
    flex: 1;
}

.footer {
    background-color: #EF9651;
}
</style>