import Vue from 'vue'
import Router from 'vue-router'

// 商品组件
import goods from '@/components/goods/goods'
// 评论组件
import ratings from '@/components/ratings/ratings'
// 商家组件
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      component: goods
    },
    // 商品详情页
    {
      path: '/goods',
      component: goods
    },
    // 评论页
    {
      path: '/ratings',
      component: ratings
    },
    // 商家页
    {
      path: '/seller',
      component: seller
    }
  ]
})
