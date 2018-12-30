<template>
  <b-card-group deck>
    <b-card no-body header="<b>Staffing</b><br>* The star rating takes into account that some nursing homes have sicker residents and may need more staff">
      <b-list-group flush>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
  export default {
    name: 'staffing'
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
