<template>
  <div class="not-found">
    <h3>Wuh!?</h3>
    <p>Looks like you are lost.</p>
    <button v-on:click="notFound" class="button">Go Back To Login</button>
  </div>
</template>

<script>
  export default {
    name: 'notfound',
    data: function () {
      return {}
    },
    methods: {
      notFound () {
        this.$router.replace('/providers')
      }
    }
  }
</script>

<style scoped>
  .not-found {
    margin-top: 40px;
  }
  button {
    margin: 10px 0;
    background-color: #0476F2;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  h3 {
    font-weight: normal;
  }
</style>
