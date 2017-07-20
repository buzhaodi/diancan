<template>

    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="detailshow=!detailshow">
                <span class="count">{{seller.supports.length}}个</span>

            </div>
        </div>


        <div class="bullein-wrapper" @click="detailshow=!detailshow">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        </div>

        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>

        <div v-show="detailshow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-mian">
                {{seller}}


                </div>
            </div>
            <div class="detail-close"  @click="detailshow=!detailshow" >
                <svg  t="1500525976872" class="icon-close" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2414"><path d="M162.510592 224.380744l61.86318-61.86318 637.101895 637.101895-61.86318 61.86318-637.101895-637.101895Z" p-id="2415"></path><path d="M799.619052 162.510592l61.86318 61.86318-637.101895 637.101895-61.86318-61.86318 637.101895-637.101895Z" p-id="2416"></path></svg>
            </div>
        </div>
    </div>


</template>

<script>
  export default {
    name: 'Hi',
    data () {
      return {
        msg: 'Welcome to 111',
        detailshow: false
      }
    },
    props: {
      seller: Object
    },
    created () {
//      第一个是满减 第二个是折扣 第三个是特价 第四个是发票 第五个是保障
      this.classMap = ['decreas', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      show () {
        this.detailshow = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position relative
        overflow hidden
        background-color rgba(7, 17, 27, 0.3)
        color #fff
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            font-size 0
        .avatar
            display inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            display inline-block
            margin-left 10px

            .title
                margin 2px 0 8px 0
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    bg-image('img/brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    line-height 18px
                    font-weight bold

            .description
                margin-bottom 10px
                line-height 12px
                font-size 12px
            .support
                .icon
                    vertical-align top
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decreas
                        bg-image('img/decrease_1')
                    &.discount
                        bg-image('img/discount_1')
                    &.guarantee
                        bg-image('img/guarantee_1')
                    &.invoice
                        bg-image('img/invoice_1')
                    &.special
                        bg-image('img/special_1')
            .text
                line-height 12px
                font-size 10px

        .support-count
            position absolute
            right 12px
            bottom 14px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            background-color rgba(0, 0, 0, 0.2)
            text-align center
        .count
            vertical-align top
            font-size 10px
        .bullein-wrapper
            height 28px
            line-height 28px
            padding 0 22px 0 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            background rgba(7, 17, 27, 0.2)
            .bulletin-title
                display inline-block
                vertical-align top
                margin-top 8px
                width 22px
                height 12px
                bg-image('img/bulletin')
                background-size 22px 12px
                background-repeat no-repeat
            .bulletin-text
                vertical-align top
                margin 0 4px
                font-size 10px

        .background
            position absolute
            top 0
            left 0px
            width 100%
            height 100%
            z-index -1
            filter blur(10px)

        .detail
            position fixed
            z-index 100
            top 0
            left 0
            width 100%
            height 100%
            background rgba(7, 17, 27, 0.8)
            overflow auto
        .detail-wrapper
           min-height 100%
          .detail-mian
             margin-top 64px
             padding-bottom 64px
             word-break break-all
        .detail-close
            position relative
            width 32px
            height 32px
            margin -64px auto 0 auto
            clear both
            font-size 32px
</style>
