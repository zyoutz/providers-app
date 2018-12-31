<template>
  <div id="printContent" class="mt-4 col-md-8 offset-md-2 col-sm-12 col-print-12">
    <b-button id="printPageButton" @click="print()">Print Provider Details</b-button>
    <b-jumbotron class="mt-2">
      <template slot="header">
        {{ provider.name }}
      </template>
      <template slot="lead">
        Description of facility will go here.
      </template>
      <hr class="my-4">
      <Information :providerId=this.$route.params.id />
      <hr class="my-4">
      <Steps />
      <hr class="my-4">
      <Rating />
      <hr class="my-4">
      <Survey />
      <hr class="my-4">
      <Staffing />
      <hr class="my-4">
      <Quality />
      <hr class="my-4">
      <p>
        Information on this form is not an endorsement or advertisement for any nursing home and should be considered
        carefully and validated for accuracy when considering nursing home placement. Use it with other information
        you gather about nursing home facilities. Talk to your doctor or other health care provider about the
        information contained here.
      </p>
      <p>
        <small>
          Compiled from publicly reported data and other data sources. Brought to you by Wouldn't you like to know.
        </small>
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
  import { db } from '../firebase'
  import Information from './sub/Information'
  import Steps from './sub/Steps'
  import Rating from './sub/Rating'
  import Survey from './sub/Survey'
  import Staffing from './sub/Staffing'
  import Quality from './sub/Quality'

  export default {
    name: 'provider',
    components: {
      Information,
      Steps,
      Rating,
      Survey,
      Staffing,
      Quality
    },
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
      },
      print () {
        window.print()
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

  @media print {
    .col-print-12 { width: 100% }
    #printPageButton {
      display: none;
    }
    body * {
      visibility: hidden;
    }
    #printContent * {
      visibility: visible;
    }
    #printContent {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
