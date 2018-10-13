<template>
<el-header class="app-header clearFix">
    <div class="app-head-logo fl">
        <router-link to="/">ERP管理系统</router-link>
    </div>
    <div class="app-top-nav fl">
        <slot name="topnav"></slot>
    </div>
    <div class="user-setting fr">
        <DropdownMenu >
            <span slot="title">管理员</span>
            <div slot="list" class="user-setting-list">
                <ul>
                    <li @click.stop="">
                        个人设置
                    </li>
                    <li @click.stop.prevent="doLogout">
                        安全退出
                    </li>
                </ul>
            </div>
        </DropdownMenu>
    </div>
</el-header>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'
import { doLogout } from 'api'
import { removeToken } from 'assets/js/auth'


export default {
    name: 'Header',
    data(){
        return {}
    },
    components: {
        DropdownMenu
    },
    methods:{
        async doLogout(){
            try {
                const response = await doLogout();
                console.log(response.data);
                if (response.data.err == 1){
                    this.$message({
                        message: '退出成功！',
                        type: 'success'
                    })
                    removeToken();
                    //刷新当前路由
                    this.$router.go(0);
                    //this.$router.replace({ path: "/" });
                    //this.$router.push({ path: "/" });
                } else {
                    this.$message({
                        message: '退出有误！',
                        type: 'error'
                    })
                }
            } catch (err){
                console.error(err)
            }
        }
    }
}
</script>

<style>
.app-header {
    height: 50px;
    line-height: 50px;
    background-color: #2dc3e8;
}
.app-head-logo {
    width: 180px;
    color: #fff;
    font-size: 16px;
}
.app-head-logo a {
    color: #fff;
}

.user-setting {
    height: 50px;
}
.user-setting-list {
    padding: 6px 0;
}
.user-setting-list ul li {
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
}
.user-setting-list ul li:hover {
    background: #2dc3e8;
    color: #fff;
}
</style>