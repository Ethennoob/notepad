<template>
    <div id="app" :class="[getTheme]">
        <n-header @tools="changePages"></n-header>
        <section class="container" :class="{'hide': table}">
            <n-add></n-add>
            <n-list></n-list>
            <n-sidebar :is-show="tools"
                       @cleardialog="clearData"
                       @uploadData="uploadData"
                       @opentable="table = true;tools = false"
                       @opentheme="theme = true;tools = false"
                       @openimage="image = true;tools = false;cover_image = false"
            ></n-sidebar>
        </section >
        <transition name="dialog">
            <!-- <n-dialog :is-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog> -->
            <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
        </transition>
        
        <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>
        <n-theme :is-show="theme" @close="theme = false"></n-theme>
        <n-image :is-show="image" @close="image = false"></n-image>
        <n-footer :is-show="cover_image"></n-footer>
    </div>
</template>

<script>
    import nHeader from './components/header.vue';
    import nFooter from './components/footer.vue';
    import nAdd from './components/event_add.vue';
    import nTable from './components/event_table.vue';
    import nList from './components/event_list.vue';
    import nSidebar from './components/sidebar.vue';
    import nDialog from './components/dialog.vue';
    import nTheme from './components/theme.vue';
    import nImage from './components/event_image.vue';
    
    export default {
        data(){
            return {
                tools:false,
                dialog: false,
                table: false,
                theme: false,
                image: false,
                dialog_type: '',
                tips: '',
                cover_image:true,
                del_info: {
                    index: 0,
                    id: 0
                }
            }
        },
        components: {
            nHeader, nAdd, nSidebar, nDialog, nTable, nList, nTheme, nFooter,nImage
        },
        computed:{
            getTheme(){             // 获取主题色
                return this.$store.getters.getTheme;
            }
        },
        methods: {
            clearData(){
                this.tools = false;
                this.dialog = true;
                this.dialog_type = 'clear';
                this.tips = '清空后无法恢复，确认清空吗？';
            },
            delData(index,id){
                this.dialog = true;
                this.dialog_type = 'del';
                this.tips = '删除后无法恢复，确认删除吗？';
                this.del_info = {
                    index: index,
                    id : id
                }
            },
            uploadData(){
                this.tools = false;
                this.dialog = true;
                this.dialog_type = 'upload';
                this.tips = 'upload';
            },
            sureDialog(){
                const self = this;
                switch (self.dialog_type){
                    case 'clear':
                        self.$store.dispatch('clearevent');
                        self.$toast('清空数据成功');
                        break;
                    case 'del':
                        self.$store.dispatch('delevent',self.del_info);
                        self.$toast('删除成功');
                        break;
                }
                this.dialog = false;
            },
            changePages(){
                if(this.table){
                    this.table = !this.table;
                }else if(this.theme){
                    this.theme = !this.theme;
                }else if(this.image){
                    this.image = !this.image;
                }else{
                    this.tools = !this.tools
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="../static/theme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
    html,body,ul,li,input,p{
        margin:0;
        padding:0;
    }
    body{
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    }
    input,button{
        -webkit-tap-highlight-color: transparent;
    }
    input[type=text]{
        -webkit-appearance: none;
    }
    button{
        padding:7px 0;
        outline: none;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
        font{
            size:inherit;
            font-family: inherit;
        }
        cursor: pointer;
    }
    html,body{
        height: 100%;
    }
    ::-webkit-scrollbar{
        width: 0;
    }
    body,#app{
        width:100%;
        overflow-x: hidden;
    }
    #app{
        height: 100%;
        padding-bottom: 60px;
        box-sizing: border-box;
    }

    ul{
        list-style: none;
    }
    .container{
        width:100%;
        padding: 0 10px;
        max-width:800px;
        margin:auto;
        box-sizing: border-box;
        &.hide{
            display: none;
        }
    }
    .dialog-enter-active, .dialog-leave-active {
        transition: opacity .3s;
    }
    .dialog-enter, .dialog-leave-to{
        opacity: 0;
    }
</style>