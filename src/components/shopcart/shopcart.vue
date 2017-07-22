<template>

    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <svg :class="{'highlight':totalCount>0}" t="1500686719459" class="icon"
                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2387">
                            <path d="M347.136 783.36q19.456 0 36.864 7.168t30.72 19.968 20.48 30.208 7.168 36.864-7.168 36.864-20.48 30.208-30.72 20.48-36.864 7.68q-20.48 0-37.376-7.68t-30.208-20.48-20.48-30.208-7.168-36.864 7.168-36.864 20.48-30.208 30.208-19.968 37.376-7.168zM773.12 785.408q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM945.152 203.776q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-12.8 37.888-22.016 62.976-24.064 68.096-17.92 53.248q-13.312 40.96-33.792 56.832t-50.176 15.872l-34.816 0-66.56 0-87.04 0-95.232 0-253.952 0 15.36 92.16 516.096 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-95.232 0-117.76 0-119.808 0-98.304 0-56.32 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l22.528 0 20.48 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0z"
                                  p-id="2388"></path>
                        </svg>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">
                    ￥{{totalPrice}}元
                </div>
                <div class="desc">
                    另需餐具费￥{{canPrice}}元
                </div>
            </div>

            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">
                        购物车
                    </h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="list-content">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price * food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontroll :food="food"></cartcontroll>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="fade">
        <div v-if="listShow" class="list-mask" ></div>
        </transition>
    </div>



</template>

<script>
  import BScroll from '../../../node_modules/better-scroll'
  import cartcontroll from '../cartcontroll/cartcontroll'

  export default {
    components: {cartcontroll},
    name: 'seshopcart',
    data () {
      return {
        msg: 'Welcome to 111',
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      canPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起点`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起点`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }

        return show
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 500
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            font-size 0
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.highlight
                            background rgb(0, 160, 220)

                        .icon
                            width 24px
                            height 24px
                            margin-top 8px
                            vertical-align top
                            fill currentColor
                            overflow hidden
                            color #80858a
                            &.highlight
                                color #fff

                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #fff
                        background rgb(240, 20, 20)
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255, 255, 255, 0.2)
                    font-size 16px
                    font-weight 700
                    color rgba(255, 255, 255, 0.4)
                    &.highlight
                        color #fff
                .desc
                    display inline-block
                    vertical-align top
                    line-height 28px
                    margin 12px 0 0 12px
                    color rgba(255, 255, 255, 0.4)
                    font-size 14px

            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    color rgba(255, 255, 255, 0.4)
                    font-weight 700
                    background #2b333b
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
        .shopcart-list
            position absolute
            left 0
            bottom 48px
            z-index -1
            width 100%

            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                background #f3f5f7
                border-bottom 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float left
                    font-size 14px
                    color rgb(7, 17, 27)
                .empty
                    float right
                    font-size 12px
                    color rgb(0, 160, 220)

            .list-content
                overflow hidden
                padding 0 18px
                max-height 217px
                background #fff
                .food
                    position relative
                    padding 12px 0
                    box-sizing border-box
                    border-1px(rgba(7, 17, 27, 0.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rbg(7, 17, 27)
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-weight 700
                        font-size 14px
                        color rgb(240, 20, 20)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 6px

    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index -50
        backdrop-filter blur(10px)
        background rgba(7,17,27,0.6)
    .fold-enter-active, .fold-leave-active
        transition opacity .2s

    .fold-enter, .fold-leave-to /* .fade-leave-active in <2.1.8 */
        opacity: 0


</style>
