<template>
  <div class="mt-2">
    <h1>{{ msg }}</h1>
    <b-alert show dismissible>
      Search for a provider to get started!
    </b-alert>
    <div class="col-sm-12 col-md-6 offset-md-3">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="providerInput"
                      label-for="providerInput">
          <b-form-input id="providerInput"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter name of provider">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Search</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
    <div class="mt-2 col-sm-12 col-md-6 offset-md-3">
      <b-list-group>
        <b-list-group-item v-for="provider in providers" :to="'/provider/' + provider['.key']" class="flex-md-column align-items-center">
          <!--<b-list-group-item class="flex-md-column align-items-center" v-for="provider in providers" :key="provider['.key']" :to="{name: 'Provider', params: {id: provider['.key']}}">-->
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ provider.name }}</h5>
            <!--<small>3 days ago</small>-->
          </div>
          <p class="mb-1">
            {{ provider.location.address }}<br>{{provider.location.city}}, {{ provider.location.state }} {{ provider.location.zip}}
          </p>
          <small v-if="provider.location.coordinates.longitude!='unknown'">
            <b-link :href="'https://www.google.com/maps/search/?api=1&query=' + provider.location.address + ', ' + provider.location.city + ', ' + provider.location.state + ', ' + provider.location.zip">Map</b-link>
            <!--Coordinates<br>{{ provider.location.coordinates.longitude }}, {{ provider.location.coordinates.latitude }}-->
          </small>
        </b-list-group-item>
      </b-list-group>
      <!--<p v-for="provider in providers">-->
        <!--{{ provider.name }}<br>-->
        <!--{{ provider.location.address }}, {{provider.location.city}}, {{ provider.location.state }}-->
      <!--</p>-->
    </div>
  </div>
</template>

<script>
  // import { db } from '../main'
  // import firebase from 'firebase'
  import { db } from '../firebase'

  export default {
    name: 'providers',
    data () {
      return {
        form: {
          name: ''
        },
        msg: 'Welcome to the Providers Search App',
        show: true,
        providers: {}
      }
    },
    // firestore: {
    //   // providers: db.ref('providers').orderByChild('name') // .orderBy('name')
    //   providers: firebase.database.ref()
    // },
    firebase: {
      providers: {
        source: db.ref('providers').orderByChild('name'),
        // Optional, allows you to handle any errors.
        cancelCallback (err) {
          console.error(err)
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        this.$bindAsArray('providers', db.ref('providers').orderByChild('name').startAt(this.form.name).endAt(this.form.name + '\uf8ff'))
      },
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.name = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => { this.show = true })
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
