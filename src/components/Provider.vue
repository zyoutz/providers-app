<template>
  <div class="mt-4 col-md-8 offset-md-2 col-sm-12">
    <b-jumbotron >
      <template slot="header">
        {{ provider.name }}
      </template>
      <template slot="lead">
        Description of facility will go here.
      </template>
      <hr class="my-4">
      <p>
        Address:<br>
        {{ provider.location.address }}<br>
        {{provider.location.city}}, {{ provider.location.state }} {{ provider.location.zip}}
      </p>
      <p>
        Coordinates:<br>
        {{ provider.location.coordinates.longitude }}, {{ provider.location.coordinates.latitude }}
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
  import { db } from '../firebase'

  export default {
    name: 'provider',
    data () {
      return {
        provider: null
      }
    },
    created () {
      this.getProvider()
    },
    watch: {
      '$route': 'getProvider'
    },
    methods: {
      getProvider: function () {
        this.provider = db.ref('providers').child(this.$route.params.id).once('value')
          .then((snapshot) => {
            let value = snapshot.val()
            this.provider = value
          }).catch((err) => {
            console.error(err)
          })
      }
    }
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
