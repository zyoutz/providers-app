<template>
  <b-card-group deck>
    <b-card no-body header="<b>CMS Star Rating (scale of 1-5; 1 is low and 5 is high)</b>">
      <b-list-group flush>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
  export default {
    name: 'rating'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
