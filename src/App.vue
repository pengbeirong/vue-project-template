<template>
    <div id="app" class="view-box-container">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "app",
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
        })
    }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "./assets/less/main.less";

.weui-tab__panel {
    padding-bottom: 0px !important;
}
</style>
