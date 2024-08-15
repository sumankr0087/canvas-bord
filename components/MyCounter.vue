<template>
    <p>Counter: {{ getCount }}</p>
    <button type="button" @click="increment">Increment</button>
</template>  

<script>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

export default {
    setup() {
        const store = useCounterStore()
        const getCount = computed(() => store.getCount)
        const { increment } = store
        return { getCount, increment }
    },
}
</script>
