<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "app",
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "./assets/less/main.less";
</style>
