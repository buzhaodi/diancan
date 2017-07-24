<template>
    <transition name="fade">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-herder">
                    <img :src="food.image">
                    <div class="back" @click="hide()">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>

                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>

                    <div content="cartcontrolwrapper" style="position:absolute;right:12px;  bottom:12px">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click="addFrist" v-show="!food.count || food.count===0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @toggle="ratingtoggle" @select="ratingselect" :desc="desc"
                                  :ratings="food.ratings"></ratingselect>
                </div>

            </div>
        </div>
    </transition>

</template>

<script>
  import Vue from 'vue'
  import BScroll from '../../../node_modules/better-scroll'
  import cartcontrol from '../cartcontroll/cartcontroll.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2
  export default {
    name: 'food',
    data () {
      return {
        msg: 'Welcome to 111',
        showFlag: false,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        toggle: true,
        addTodo: 2
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['food'], {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      addFrist (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      hide () {
        this.showFlag = false
      },
      ratingtoggle (type) {
        console.log(type)
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      ratingselect () {
        this.onlyContent
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    .food
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 30
        width 100%
        background #fff
        .image-herder
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 18px
                font-size 20px
                color white
        .content
            position relative
            padding 18px
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7, 17, 27)
            .detail
                margin-bottom 18px
                line-height 10px
                height 10px
                font-size 0
                .sell-count, .rating
                    font-size 10px
                    color rgb(147, 153, 159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240, 20, 20)
                .old
                    text-decoration line-through
                    font-size 10px
                    color rgb(147, 153, 159)
            .buy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #fff
                background rgb(0, 160, 220)

        .info
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7, 17, 27)
            .text
                line-height 24px
                padding 0 8px
                font-size 12px
                color rgb(77, 85, 93)
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7, 17, 27)
</style>
