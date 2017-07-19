<template>

    <div class="header">
        我是头部

        <img :src="seller.avatar">

    </div>


</template>

<script>
export default {
  name: 'Hi',
  data () {
    return {
      msg: 'Welcome to 111'
    }
  },
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

</style>
