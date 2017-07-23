<template>
    <transition name="fade">
    <div v-show="showFlag" class="food">
        <div class="food-content">
            <div class="image-herder">
                <img :src="food.image">
            </div>
        </div>
    </div>
    </transition>

</template>

<script>
  export default {
    name: 'food',
    data () {
      return {
        msg: 'Welcome to 111'
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    computed: {
      showFlag () {
        if (this.food.name) {
          return true
        }
      }
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
</style>
