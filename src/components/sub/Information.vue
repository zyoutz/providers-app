<template>
  <b-card-group deck>
    <b-card no-body header="<b>General Facility Information</b>">
      <b-list-group flush>
        <b-list-group-item>
          Ownership: {{ ownership }}
        </b-list-group-item>
        <b-list-group-item>
          Address:
          <b-link target="_blank" :href="'https://www.google.com/maps/search/?api=1&query=' + provider.location.address + ', ' + provider.location.city + ', ' + provider.location.state + ', ' + provider.location.zip">
            {{ provider.location.address }}, {{ provider.location.city }}, {{ provider.location.state }} {{ provider.location.zip}}
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          Phone: {{ phone }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
  import { db } from '../../firebase'

  export default {
    name: 'information',
    props: {
      'providerId': {
        type: String,
        required: true
      }
    },
    data () {
      return {
        provider: null,
        ownership: 'Unknown',
        phone: 'Unknown'
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
        this.provider = db.ref('providers').child(this.providerId).once('value')
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
