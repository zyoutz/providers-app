<template>
  <b-card-group deck>
    <b-card no-body header="<b>Always remember to follow these steps</b>">
      <b-list-group flush>
        <b-list-group-item>Step 1: Find nursing homes in your area.</b-list-group-item>
        <b-list-group-item>Step 2: Compare the quality of the nursing homes you are considering.</b-list-group-item>
        <b-list-group-item>Step 3: Visit the nursing homes you are interested in or have someone visit for you.</b-list-group-item>
        <b-list-group-item>Step 4: Choose the nursing home that meets your needs.</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
  export default {
    name: 'steps'
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
