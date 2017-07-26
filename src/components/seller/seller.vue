<template>


    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}}）</span>
                    <span class="text">月售{{seller.sellCount}}</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起点价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-warpper  border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="supports-item border-1px" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>

                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="pic-wrapper">
                    <ul class="pic-list" ref="pic-list">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img width="120" height="90" :src="pic">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="tittle border-1px">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
  import split from '../split/split.vue'
  import star from '../star/star.vue'
  import BScroll from '../../../node_modules/better-scroll'
  export default {
    name: 'seller',
    data () {
      return {
        coun: 0
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
//      第一个是满减 第二个是折扣 第三个是特价 第四个是发票 第五个是保障
      this.classMap = ['decreas', 'discount', 'special', 'invoice', 'guarantee']
      this.seller.tess = 2
      this._initScroll()
      this._initPicScroll()
    },
    watch: {
      seller () {
        this._initScroll()
        this._initPicScroll()
      }
    },
    methods: {
      _initScroll () {
        if (this.coun === 0) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs['seller'], {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
          this.coun++
        } else {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs['seller'], {
              click: true
            })
          })
          this.coun++
          return
        }
      },
      _initPicScroll () {
        if (this.seller.pics) {
          if (!this.picscroll) {
            let picWidth = 120
            let margin = 6
            let width = (picWidth + margin) * this.seller.pics.length - margin
            this.$nextTick(() => {
              this.$refs['pic-list'].style.width = width + 'px'
              this.picscroll = new BScroll(this.$refs['pic-wrapper'], {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .seller
        position absolute
        top 174px
        bottom 0
        left 0
        width 100%
        overflow hidden
        .overview
            padding 18px
            .title
                margin-bottom 8px
                line-height 14px
                color rgb(7, 17, 27)
                font-size 14px
            .desc
                padding-bottom 18px
                font-size 0
                border-1px(rgba(7, 17, 27, 0.1))
                .star
                    display inline-block
                    margin-right 8px
                    vertical-align top
                .text
                    margin-right 12px
                    display inline-block
                    vertical-align top
                    line-height 18px
                    font-size 10px
                    color rgb(77, 80, 93)

            .remark
                display flex
                padding-top 18px
                .block
                    flex 1
                    text-align center
                    border-right 1px solid rgba(7, 17, 27, 0.1)
                    &:last-child
                        border none
                    h2
                        margin-bottom 4px
                        line-height 10px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .content
                        line-height 24px
                        font-size 10px
                        color rgb(7, 27, 27)
                        .stress
                            font-size 24px

        .bulletin
            padding 18px 18px 0 18px
            .title
                margin-bottom 8px
                line-height 14px
                color rgb(7, 17, 27)
                font-size 14px
            .content-warpper
                padding 0 12px 16px 12px
                border-1px(rgba(7, 17, 27, 0.1))
                .content
                    line-height 24px
                    font-size 12px
                    color rgb(240, 20, 20)
            .supports
                .supports-item
                    padding 16px 12px
                    font-size 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .icon
                        vertical-align top
                        display inline-block
                        width 16px
                        height 16px
                        margin-right 6px
                        background-size 16px 16px
                        background-repeat no-repeat
                        &.decreas
                            bg-image('img/decrease_4')
                        &.discount
                            bg-image('img/discount_4')
                        &.guarantee
                            bg-image('img/guarantee_4')
                        &.invoice
                            bg-image('img/invoice_4')
                        &.special
                            bg-image('img/special_4')
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7, 17, 27)


        .pics
            padding 18px
            .title
                margin-bottom 12px
                line-height 14px
                color rgb(7, 17, 27)
                font-size 14px
            .pic-wrapper
                width 100%
                overflow hidden
                white-space nowrap
                .pic-list
                    font-size 0
                    .pic-item
                        display inline-block
                        margin-right 6px
                        width 120px
                        height 90px
                        &:last-child
                            margin 0
        .info
            padding 18px 18px 0 18px
            color rgb(7, 17, 27)
            .tittle
                padding-bottom 12px
                line-height 14px
                border-1px(rgba(7,17,27,0.1))
                font-size 14px
            .info-item
                padding 16px 12px
                line-height 16px
                border-1px(rgba(7,17,27,0.1))
                font-size 14px
                &:last-child
                    border-none()

</style>
