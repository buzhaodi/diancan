<template>
    <!--商品组件-->
    <div class="goods">
        <!--侧边栏-->
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul>
                <li v-for="(item , $index) in goods" class="menu-item" :class="{'current' :currentIndex===$index}"
                    @click="selectMenu($index,$event)">
                    <span class="text border-1px">
                       <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!--右边详情-->
        <div class="foods-wrapper" ref="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-List-hook">
                    <h1 class="title">
                        {{item.name}}
                    </h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57px" height="57px" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月销{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectFoods="selecetFoods" :can-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>


</template>

<script type="text/ecmascript-6">
  import BScroll from '../../../node_modules/better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontroll/cartcontroll.vue'

  export default {
    name: 'goods',
    data () {
      return {
        msg: 'Welcome to 111',
        show: true,
        goods: [],
        classMap: [],
        ListHeight: [],
        scrollY: 0
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decreas', 'discount', 'special', 'invoice', 'guarantee']
      this.axios.get('/api/goods').then((response) => {
        if (response.data.errno === 0) {
          this.goods = response.data.data
          // dom从新更新 $nextTick就是方法
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
//      设置滚动方法
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 获得区块的高度
      _calculateHeight () {
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-List-hook')
        let height = 0
        this.ListHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.ListHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-List-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
        console.log(index)
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.ListHeight.length; i++) {
          let height = this.ListHeight[i]
          let height2 = this.ListHeight[i + 1]
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selecetFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      shopcart,
      cartcontrol
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display flex
        position absolute
        top 174px
        width 100%
        bottom 46px
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            .menu-item
                display table
                height 54px
                width 56px
                line-height 14px
                padding 0 12px
                &.current
                    position relative
                    margin-top -1px
                    z-index 10px
                    background #fff
                    font-weight 700
                    .text
                        border-none()
                .icon
                    vertical-align top
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decreas
                        bg-image('img/decrease_3')
                    &.discount
                        bg-image('img/discount_3')
                    &.guarantee
                        bg-image('img/guarantee_3')
                    &.invoice
                        bg-image('img/invoice_3')
                    &.special
                        bg-image('img/special_3')
                .text
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size 12px
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147, 153, 159)
                background #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom 0
            .icon
                flex 0 0 57px
                margin-right 10px
            .content
                flex 1px
                font-weight bold
                .name
                    margin 2px 0 8px 0
                    height 14px
                    line-height 14px
                    font-size 14px
                    color rgb(7, 17, 27)
                .desc, .extra
                    font-weight 100
                    margin-bottom 8px
                    line-height 10px
                    font-size 10px
                    color rgb(147, 153, 159)
                .desc
                    line-height 13px
                    margin-bottom 8px
                .extra
                    .count
                        margin-right 10px
                .price
                    line-height 24px
                    .now
                        margin-right 8px
                        font-size 14px
                        color rgb(240, 20, 20)
                    .old
                        text-decoration line-through
                        font-size 10px
                        color rgb(147, 153, 159)
                .cartcontrol-wrapper
                    position absolute
                    right 0
                    bottom 12px
</style>
