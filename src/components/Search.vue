<template>
    <div class="container text-center">
        <div class="row justify-content-md-center">
            <div class="col-sm-6">
                <div class="form-floating">
                    <input type="text" class="form-control" id="search" placeholder="text" v-model="searchQuery">
                    <label for="search">Search...</label>   
                </div>
            </div>
            <div class="col-sm-1">
                <button type="button" class="btn btn-primary btn-circular" @click="emit('search', getSearchQuery())"><font-awesome-icon :icon="faMagnifyingGlass" /></button>
            </div>
        </div>
        <div class="row justify-content-md-center mt-1">
            <div class="col-sm-6">
                <div class="accordion" id="advancedSearch">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvancedSearch" aria-expanded="true" aria-controls="collapseAdvancedSearch">
                                Advanced Search
                            </button>
                        </h2>
                        <div id="collapseAdvancedSearch" class="accordion-collapse collapse" data-bs-parent="#advancedSearch">
                            <div class="accordion-body">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="location" v-model="location">
                                    <label for="location">Location</label>
                                </div>
                                <div class="container mb-3">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="dateBegin" v-model="dateBegin">
                                                <label for="dateBegin">Date Begin</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="dateEnd" v-model="dateEnd">
                                                <label for="dateEnd">Date End</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="medium" v-model="medium">
                                    <label for="medium">Medium</label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-1">

            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'

const location = ref<string>();
const dateBegin = ref<number>();
const dateEnd = ref<number>();
const medium = ref<string>();
const searchQuery = ref<string>();

function getSearchQuery(): SearchQuery {
    return {
        search: searchQuery.value ?? '',
        location: location.value,
        dateBegin: dateBegin.value,
        dateEnd: dateEnd.value,
        medium: medium.value
    }
}

const emit = defineEmits<{
  search: [query: SearchQuery]
}>();

export interface SearchQuery {
    search: string;
    location: string | undefined;
    dateBegin: number | undefined;
    dateEnd: number | undefined;
    medium: string | undefined;
}

</script>

<style scoped>
.btn {
    margin-left: -4rem;
    margin-top: 0.5rem;
    }

.btn-circular {
        width: 40px; /* Adjust as needed */
        height: 40px; /* Should be equal to width for a perfect circle */
        border-radius: 50%;
        padding: 0; /* Ensure no padding affects the shape */
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

.btn-primary {
  background-color: #3F7D58 !important;
  border-color: #3F7D58 !important;
    }

.btn-primary:hover {
  background-color: #0D4715 !important;
  border-color: #0D4715 !important;
    }

</style>