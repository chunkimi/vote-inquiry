import { initializeApp } from 'firebase/app'
import { getFirestore, doc, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAx0F4LFvgWdQWvgVpGccR1ZAb0fGL2QkY',
  authDomain: 'tw-elections.firebaseapp.com',
  projectId: 'tw-elections',
  storageBucket: 'tw-elections.appspot.com',
  messagingSenderId: '112285564090',
  appId: '1:112285564090:web:dc66f0348130b34b1b9683',
}

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)

export const elections_id = '2020'

export const collectionRefs = {
  currentElectionRef(county, district) {
    if (county && district) {
      return collection(
        db,
        'Elections',
        elections_id,
        'County',
        county,
        'District',
        district,
        'Village',
      )
    }

    if (county) {
      return collection(
        db,
        'Elections',
        elections_id,
        'County',
        county,
        'District',
      )
    }

    return collection(db, 'Elections', elections_id, 'County')
  },
}

export const documentRefs = {
  electionRef(county, district) {
    if (county && district) {
      return doc(collectionRefs.currentElectionRef(county), district)
    }

    if (county) {
      return doc(collectionRefs.currentElectionRef(), county)
    }

    return doc(collection(db, 'Elections'), elections_id)
  },
}
