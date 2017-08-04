<template>
    <div id="app">
        <v-header :seller="seller"></v-header>

        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>

            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>

        </div>
        <transition name="fade">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
  import header from '@/components/header/header.vue'
  import { urlParse } from '@/common/js/until.js'

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })(),
          tableNumber: (() => {
            let queryParam = urlParse()
            return queryParam.tableNumber
          })()
        }
      }
    },
    created () {
      this.axios.get(this.SERVERDOMIAN + '/fapi/seller?id=' + this.seller.id + '&tableNumber=' + this.seller.tableNumber).then((response) => {
        if (response.data.errno === 0) {
          this.seller = response.data.data
        }
      })
    },
    components: {
      vHeader: header
    },
    name: 'app'

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/index.styl"
    @import "common/icon.styl"
    #app
        .tab
            display flex
            width 100%
            height 40px
            line-height 40px
            border-1px(rgba(7, 17, 27, 0.1))
            .tab-item
                flex 1
                text-align center
            & a
                display block
                font-size 14px
                color rgb(77, 85, 93)
            & .router-link-active
                color rgb(240, 20, 20)

    .fade-enter-active, .fade-leave-active
        transition opacity .2s

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
        opacity: 0


</style>
