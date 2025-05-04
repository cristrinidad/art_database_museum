<template>
    <nav aria-label="Page Navigation">
        <ul class="pagination justify-content-end">
            <li v-if="props.total != 0" class="page-item">
                <a class="page-link" href="#" @click="prevPage()"><font-awesome-icon :icon="faChevronLeft" /></a>
            </li>
            <li v-for="page in pageArray1" :key="page" class="page-item">
                <a v-if="props.selectedPage == page" class="page-link active" href="#" @click="emit('click', page)">{{page}}</a>
                <a v-else class="page-link" href="#" @click="emit('click', page)">{{page}}</a>
            </li>
            <li v-for="page in pageArray2" :key="page" class="page-item">
                <a v-if="typeof page === 'number' && props.selectedPage == page" class="page-link active" href="#" @click="emit('click', page)">{{page}}</a>
                <a v-else-if="typeof page === 'number' && props.selectedPage != page" class="page-link" href="#" @click="emit('click', page)">{{page}}</a>
                <a v-else class="page-link" href="#">{{page}}</a>
            </li>
            <li v-for="page in pageArray3" :key="page" class="page-item">
                <a v-if="typeof page === 'number' && props.selectedPage == page" class="page-link active" href="#" @click="emit('click', page)">{{page}}</a>
                <a v-else-if="typeof page === 'number' && props.selectedPage != page" class="page-link" href="#" @click="emit('click', page)">{{page}}</a>
                <a v-else class="page-link" href="#">{{page}}</a>
            </li>
            <li v-if="props.total != 0" class="page-item">
                <a class="page-link" href="#" @click="nextPage()"><font-awesome-icon :icon="faChevronRight" /></a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue';

interface ListProps {
    total: number;
    itemsPerPage: number;
    selectedPage: number;
}
const props = defineProps<ListProps>();

const emit = defineEmits<{
  click: [page: number]
}>();


const numberOfPages = computed(() => {
    return Math.ceil(props.total / props.itemsPerPage);
});

function prevPage() {
    if (props.selectedPage > 1)
    {
        emit('click', props.selectedPage - 1);
    }
}

function nextPage() {
    if (props.selectedPage < numberOfPages.value)
    {
        emit('click', props.selectedPage + 1);
    }
}

// Page Array Groups
// First Page array
const pageArray1 = computed(() => {
    if (numberOfPages.value > 5) {
        if(props.selectedPage >= 4)
        {
            return Array.from([1]);
        }
        else {
            return Array.from([1,2,3,4]);
        }
    }
    else {
        return Array.from({ length: numberOfPages.value }, (_, i) => i + 1);
    }
});

const pageArray2 = computed<Array<string | number>>(() => {
    if (numberOfPages.value > 5) {
        if(props.selectedPage >= 4 && (numberOfPages.value - props.selectedPage) >= 2 )
        {
            return Array.from(["...", props.selectedPage - 1, props.selectedPage, props.selectedPage + 1]);
        }
        else{
            return Array.of();
        }
    }
    else {
        return Array.of();
    }
});

const pageArray3 = computed<Array<string | number>>(() => {
    if (numberOfPages.value > 5) {
        if(props.selectedPage >= 5 && (numberOfPages.value - props.selectedPage) <= 1)
        {
            return Array.from(["...", numberOfPages.value - 3, numberOfPages.value - 2, numberOfPages.value - 1, numberOfPages.value]);
        }
        else{
            return Array.from(["...", numberOfPages.value]);
        }
    }
    else {
        return [];
    }
});
</script>

<style scoped>

</style>