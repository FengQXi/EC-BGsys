<template>
    <div class="app-container">
        <cards></cards>
        <sale></sale>
        <observe></observe>
    </div>
</template>

<script>
import Cards from "./Cards"
import Sale from "./Sale"
import Observe from "./Observe"

export default {
    name: 'Dashboard',
    components: {
        Cards, Sale, Observe,
    }
}
</script>

<style scoped>

</style>
