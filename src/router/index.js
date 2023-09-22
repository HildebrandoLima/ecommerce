import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/About.vue';
import Account from '@/views/Account.vue';
import Cart from '@/views/cart/Cart.vue';
import Category from '@/views/category/Category.vue';
import Checkout from '@/views/cart/Checkout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/login/Login.vue';
import Payment from '@/views/payment/Payment.vue';
import Product from '@/views/product/Product.vue';
import ProductByCategory from '@/views/product/ProductByCategory.vue';
import ProductDetails from '@/views/product/ProductDetails.vue';
import User from '@/views/client/User.vue';
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
      path: '/payment',
      name: 'payment',
      component: Payment,
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
      path: '/client',
      name: 'client',
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
      next({
        name: 'login',
        params: {
          errorMessage: 'Você precisa estar autenticado para acessar esta página.'
        }
      });
    }
  } else {
    next();
  }
});

export default router;