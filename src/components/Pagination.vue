<template>
    <nav aria-label="Page Navigation">
        <ul class="pagination justify-content-end">
            <li class="page-item">
            <a class="page-link" href="#">Previous</a>
            </li>
            <li v-for="page in numberOfPages" :key="page" class="page-item">
                <a class="page-link" href="#" @click="emit('click', page)">{{page}}</a>
            </li>
            <li class="page-item">
            <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ListProps {
    total: number;
    itemsPerPage: number;
}
const props = defineProps<ListProps>();

const emit = defineEmits<{
  click: [page: number]
}>();

const numberOfPages = computed(() => {
    return Math.ceil(props.total / props.itemsPerPage);
});

</script>

<style scoped>

</style>