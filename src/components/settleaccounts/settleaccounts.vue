<template>
    <!--商品组件-->
    <div class="settleaccounts">
        <div class="header">
            {{$route.params}}
            <img class="avatar">
            <div class="sellername"></div>
        </div>
        <div class="body">
            <div class="item"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontroll/cartcontroll.vue'
  import food from '../food/food.vue'
  import split from '../split/split.vue'
  import { urlParse } from '@/common/js/until.js'
  export default {
    name: 'goods',
    data () {
      return {
      }
    },
    props: {
      check: []
    },
    created () {
      this.getpay()
    },
    components: {
      shopcart,
      cartcontrol,
      food,
      split
    },
    methods: {
      getpay () {
        let queryParam = urlParse()
        this.axios.post(this.SERVERDOMIAN + '/fapi/goods/comput', {
          id: parseInt(queryParam.id),
          tableNumber: queryParam.tableNumber,
          check: this.$route.params
        }).then((response) => {
          if (response.data.errno === 0) {
            this.goods = response.data.data
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        if (this.$route.path !== '/settleaccounts') {
          return
        }
        this.getpay()
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .settleaccounts
        display flex
        position absolute
        top 0
        height 100%
        z-index 999
        background white
        width 100%
        bottom 46px
        overflow hidden

</style>
