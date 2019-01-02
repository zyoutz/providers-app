<template>
  <b-card-group deck>
    <b-card no-body header="<b>CMS Star Rating (scale of 1-5; 1 is low and 5 is high)</b>">
      <b-list-group flush>
        <b-list-group-item>
          <b>Overall Rating: {{ provider.ratings != null && provider.ratings.overall_rating != null ?
            provider.ratings.overall_rating : 'Unknown'}} Stars</b> - an average of the following areas.
        </b-list-group-item>
        <b-list-group-item>
          Health Inspections: {{ provider.ratings != null && provider.ratings.health_inspection_rating != null ?
          provider.ratings.health_inspection_rating : 'Unknown'}} - The health inspection star rating is
          based off of 2 years of inspections occurring before [date goes here].
        </b-list-group-item>
        <b-list-group-item>
          Staffing: {{ provider.ratings != null && provider.ratings.staffing_rating != null ?
          provider.ratings.staffing_rating : 'Unknown'}} - number of staff compared to the number of residents as well
          as how many of the staff are trained nurses.
        </b-list-group-item>
        <b-list-group-item>
          Quality: {{ provider.ratings != null && provider.ratings.qm_rating != null ?
          provider.ratings.qm_rating : 'Unknown'}} - provide an important in-depth look at how well each nursing home
          performs on important aspects of care.
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
  import { db } from '../../firebase'

  export default {
    name: 'rating',
    props: {
      'providerId': {
        type: String,
        required: true
      }
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
        this.provider = db.ref('providers').child(this.providerId).once('value')
          .then((snapshot) => {
            let value = snapshot.val()
            this.provider = value
          }).catch((err) => {
            console.error(err)
          })
      },
      getRatingValue: function (ratingType) {
        if (this.provider.ratings !== null && this.provider.ratings[ratingType] !== null) {
          return this.provider.ratings[ratingType]
        } else {
          return 'Unknown'
        }
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
