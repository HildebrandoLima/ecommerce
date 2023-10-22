<template>
<header>
  <NavBarAdmin v-if="isAdmin"/>
  <NavBarClient v-else />
</header>
  <RouterView />
<Footer />
</template>

<script>
import { RouterView } from 'vue-router';
import NavBarAdmin from './components/fixos/admin/NavBar.vue';
import NavBarClient from './components/fixos/NavBar.vue';
import Footer from './components/fixos/Footer.vue';
import { userAuth } from '@/storages/AuthStorage';

export default {
  name: 'app',
  userId: 0,
  userName: '',
  userEmail: '',
  isAdmin: false,
  components: { RouterView, NavBarAdmin, NavBarClient, Footer },
  created() {
      const [userId, userName, userEmail, isAdmin] = userAuth();
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.isAdmin = isAdmin;
  },
};
</script>