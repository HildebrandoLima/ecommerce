import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Account from '@/views/Account.vue'
import Cart from '@/views/Cart.vue'
import Category from '@/views/Category.vue'
import Checkout from '@/views/Checkout.vue'
import Home from '@/views/Home.vue'
import Payment from '@/views/Payment.vue'
import Product from '@/views/Product.vue'
import ProductByCategory from '@/views/ProductByCategory.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/productByCategory/:id',
      name: 'productByCategory',
      component:  ProductByCategory
    }, 
    {
      path: '/productDetails',
      name: 'productDetails',
      component:  ProductDetails
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
  ]
})

export default router
