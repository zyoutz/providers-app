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
      if (providers[i]['provider_state'] !== 'MI') { continue; }

      console.debug('Processing: ' + providers[i]['provider_name'] + ' (' + providers[i]['provider_state'] + ')');
      try {
        let provider = {
          name: providers[i]['provider_name'],
          location: {
            address: providers[i]['provider_address'],
            city: providers[i]['provider_city'],
            state: providers[i]['provider_state'],
            zip: providers[i]['provider_zip_code'],
            coordinates: {
              longitude: 'unknown',
              latitude: 'unknown',
            },
          },
        };

        if ('location' in providers[i]) {
          if ('coordinates' in providers[i]['location']) {
            provider['location']['coordinates']['longitude'] = providers[i]['location']['coordinates'][0];
            provider['location']['coordinates']['latitude'] = providers[i]['location']['coordinates'][1];
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
  const url = 'https://data.medicare.gov/resource/ikq5-jt9b.json'
  let numProviders = await retrieveProviders(url);

  console.info('Total number of providers processed: ' + numProviders)
  res.send({num: numProviders})

  // console.info('Providers success: ' + success_count + ' ; Providers failure: ' + failure_count);
  // res.send({details: 'Providers Processed', success: success_count, failure: failure_count});
});
