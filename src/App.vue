<template>
  <div id="app">
    <!--<header>-->
      <!--<span>Providers App</span>-->
    <!--</header>-->
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
      <!--<router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace align="right">Logout</router-link>-->
    <!--</div>-->

    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="'providers'">
        <img src="/static/img/icons/favicon-32x32.png" class="d-inline-block align-top" alt="PA">
        Providers App
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Providers' }">Providers</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="authenticated" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main>
      <img src="./assets/logo.png" alt="Providers App">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app',
  data () {
    return {
      authenticated: true,
      username: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          console.debug('Successfully signed out user')
          this.authenticated = false
          this.$router.push({ name: 'Login' })
        })
        .catch(function (error) {
          console.error('Failed to sign out: ' + error)
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
