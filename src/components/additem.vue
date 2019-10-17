<template>
    <div>
        {{index}}
    </div>
</template>

<style>
</style>

<script>


export default {
    props: [ "index", "item" ]
    , data() {
        return {
        }
    }
    , methods: {
        updateTotal() {
        }
    }
    , mounted(){
        this.updateTotal();
    }
    , computed: {

    }
};
</script>
