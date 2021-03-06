'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const axios = require('axios');

try {
  admin.initializeApp();
} catch (e) {
  console.error('Failed to initialize firebase admin SDK')
  return
}

const db = admin.database();
const ref = db.ref('providers');

const PAGE_SIZE = 50000

async function saveProviders(providers) {
  try {
    for (let i = 0; i < providers.length; i++) {
      try {
        if (providers[i]['provider_state'] !== 'MI') { continue; }

        let location = providers[i]['location'];
        let address_json = JSON.parse(location['human_address'])

        console.debug('Processing: ' + providers[i]['provider_name'] + ' (' + providers[i]['provider_state'] + ')');

        let provider = {
          name: providers[i]['provider_name'],
          name_upper: providers[i]['provider_name'].toUpperCase(),
          location: {
            address: address_json['address'],
            city: address_json['city'],
            state: address_json['state'],
            zip: address_json['zip'],
            coordinates: {
              longitude: 'unknown',
              latitude: 'unknown',
            },
          },
          ratings: {}
        };

        // Get rating details if available
        const rating_metrics = ['rn_staffing_rating', 'health_inspection_rating', 'staffing_rating', 'qm_rating', 'overall_rating'];
        for (let r = 0; r < rating_metrics.length; r++) {
          if (rating_metrics[r] in providers[i]) {
            provider['ratings'][rating_metrics[r]] = providers[i][rating_metrics[r]];
          }
        }

        // Get coordinate details if available
        const coordinate_types = ['longitude', 'latitude'];
        for (let c = 0; c < coordinate_types.length; c++) {
          if (coordinate_types[c] in location) {
            provider['location']['coordinates'][coordinate_types[c]] = location[coordinate_types[c]];
          }
        }

        ref.child(providers[i]['federal_provider_number']).set(provider);
        // success_count++;
      } catch (e) {
        console.error('Failed to add provider to datastore' + e);
        console.debug(providers[i]);
        // failure_count++;
      }
    }

    return providers.length
  } catch (error) {
    console.log(error)
  }
}

async function retrieveProviders(url) {
  let total = 0;
  let offset = 0;
  let keepGoing = true;
  while (keepGoing) {
    try {
// eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${url}?$limit=${PAGE_SIZE}&$offset=${offset}`);
      const data = response.data;
      console.info('Processing ' + data.length + ' providers, offset: ' + offset);
      offset += PAGE_SIZE;
// eslint-disable-next-line no-await-in-loop
      total += await saveProviders(data);

      if (data.length < PAGE_SIZE) {
        keepGoing = false;
// eslint-disable-next-line no-await-in-loop
        return (await total);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

exports.processProviders = functions.runWith({memory: '2GB', timeoutSeconds: 540}).https.onRequest(async (req, res) => {
  const url = 'https://data.medicare.gov/resource/ax9d-vq6k.json'
  let numProviders = await retrieveProviders(url);

  console.info('Total number of providers processed: ' + numProviders)
  res.send({num: numProviders})

  // console.info('Providers success: ' + success_count + ' ; Providers failure: ' + failure_count);
  // res.send({details: 'Providers Processed', success: success_count, failure: failure_count});
});
