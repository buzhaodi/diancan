<template>

    <div class="cartcontrol">
        <transition name="move" mode="out-in">

            <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food.count>0">

            </div>
        </transition>
        <transition name="move" mode="out-in">
            <div class="cart-count " v-show="food.count>0">
                {{food.count}}
            </div>
        </transition>
        <div class="cart-add icon-add_circle" @click="addCart">

        </div>
    </div>

</template>

<script>
//      加减号组件
  import Vue from 'vue'
  export default {
    name: 'cartcontroll',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size 0
        .cart-decrease, .cart-add
            display inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color rgb(0, 160, 220)
        .cart-count
            display inline-block
            line-height 24px
            font-size 15px
            vertical-align top
            width 12px
            padding-top 6px
            text-align center
            color rgb(147, 153, 159)
        .car-add
            display inline-block

    .move-enter-active, .move-leave-active
        transition: opacity 0.4s

    .move-enter, .move-leave-to /* .fade-leave-active in <2.1.8 */
        opacity: 0

</style>
