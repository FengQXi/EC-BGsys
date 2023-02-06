<template>
    <div class="app-container">
        <cards></cards>
        <sale></sale>
    </div>
</template>

<script>
import Cards from "./Cards"
import Sale from "./Sale"

export default {
    name: 'Dashboard',
    components: {
        Cards, Sale,
    }
}
</script>

<style scoped>

</style>
