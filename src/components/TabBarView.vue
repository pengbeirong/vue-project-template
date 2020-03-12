<template>
    <div class="view-box-container">
        <view-box ref="viewBox">
            <router-view></router-view>
        </view-box>
        <tabbar>
            <tabbar-item
                :selected="routeName === 'Home'"
                icon-class="tab-bar-icon-class"
                @click.native="toReturn('Home')"
            >
                <span slot="icon" class="iconfont icon-home"></span>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item
                :selected="routeName === 'About'"
                icon-class="tab-bar-icon-class"
                @click.native="toReturn('About')"
            >
                <span slot="icon" class="iconfont icon-mine"></span>
                <span slot="label">关于</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from "vux";
import { getTokenId } from "src/api/token";

export default {
    name: "tabBarView",
    components: {
        ViewBox,
        Tabbar,
        TabbarItem
    },
    data() {
        return {
            routeName: "Home"
        };
    },
    mounted() {
        this.$nextTick(function() {
            this.routeName = this.$route.name;
        });
    },
    methods: {
        toReturn(name) {
            this.$router.replace({
                name: name
            })
        }
    }
};
</script>
