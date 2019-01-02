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
const ref = db.ref('providerSurveys');

const PAGE_SIZE = 50000

async function saveProviders(providers) {
  try {
    for (let i = 0; i < providers.length; i++) {
      try {
        if (providers[i]['provider_state'] !== 'MI') { continue; }

        console.debug('Processing: ' + providers[i]['provider_name'] + ' (' + providers[i]['provider_state'] + ')');

        let provider = {
          fire_saftey_survey_date: providers[i]['fire_saftey_survey_date'],
          health_survey_date: providers[i]['health_survey_date']
        };

        // Get rating details if available
        const survey_titles = ['count_of_administration_deficiencies', 'count_of_automatic_sprinkler_systems_deficiencies',
          'count_of_construction_deficiencies', 'count_of_corridor_walls_and_doors_deficiencies', 'count_of_pharmacy_service_deficiencies'];
        for (let s = 0; s < survey_titles.length; s++) {
          if (survey_titles[s] in providers[i]) {
            provider[survey_titles[s]] = providers[i][survey_titles[s]];
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

exports.processProviderSurveys = functions.runWith({memory: '2GB', timeoutSeconds: 540}).https.onRequest(async (req, res) => {
  const url = 'https://data.medicare.gov/resource/gx3u-faec.json'
  let numProviders = await retrieveProviders(url);

  console.info('Total number of providers processed: ' + numProviders)
  res.send({num: numProviders})

  // console.info('Providers success: ' + success_count + ' ; Providers failure: ' + failure_count);
  // res.send({details: 'Providers Processed', success: success_count, failure: failure_count});
});
