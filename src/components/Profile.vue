<template>
  <div class="mt-4 col-md-8 offset-md-2 col-sm-12">
    <b-jumbotron >
      <template slot="lead">
        Name: {{ name }}<br>
        Username: {{ username }}<br>
        Company: {{ company }}
      </template>
      <hr class="my-4">
      <p>User profile stuff goes here eventually.</p>
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data: function () {
      return {
        name: 'Amelia Earhart',
        username: 'aearhart',
        company: 'Flying School'
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
