import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/about/About.vue';
import Account from '@/views/account/Account.vue';
import Cart from '@/views/cart/Cart.vue';
import Category from '@/views/admin/category/Category.vue';
import Checkout from '@/views/client/checkout/Checkout.vue';
import Dashboard from '@/views/admin/dashboard/Dashboard.vue';
import Home from '@/views/home/Home.vue';
import Login from '@/views/login/Login.vue';
import Order from '@/views/client/order/Order.vue';
import Payment from '@/views/client/payment/Payment.vue';
import Provider from '@/views/admin/provider/Provider.vue';
import Profile from '@/views/client/profile/Profile.vue';
import ProductAdmin from '@/views/admin/product/Product.vue';
import Product from '@/views/product/Product.vue';
import ProductByCategory from '@/views/product/ProductByCategory.vue';
import ProductDetails from '@/views/product/ProductDetails.vue';
import User from '@/views/admin/user/User.vue';
import { token, userAuth, permissions } from '@/storages/AuthStorage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        auth: true,
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        auth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        auth: true,
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        auth: true,
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {
        auth: true,
      }
    },
    {
      path: '/provider',
      name: 'provider',
      component: Provider,
      meta: {
        auth: true,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        auth: true,
      }
    },
    {
      path: '/productAdmin',
      name: 'productAdmin',
      component: ProductAdmin,
      meta: {
        auth: true,
      }
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
    {
      path: '/productByCategory/:id',
      name: 'productByCategory',
      component:  ProductByCategory,
    },
    {
      path: '/productDetails/:id',
      name: 'productDetails',
      component:  ProductDetails,
    },
    {
      path: '/user',
      name: 'user',
      component:  User,
      meta: {
        auth: true,
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const accessToken = token();
    const [userId, userName, userEmail] = userAuth();
    const userPermissions = permissions();
    if (accessToken && userId && userName && userEmail && userPermissions) {
      next();
    } else {
      next({name: 'login'});
    }
  } else {
    next();
  }
});

export default router;