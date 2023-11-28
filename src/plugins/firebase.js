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

export const collectionRefs = {
  currentElectionRef(city, district) {
    if (city && district) {
      return collection(
        db,
        'Elections',
        'Votes',
        'City',
        city,
        'District',
        district,
        'Village',
      )
    }

    if (city) {
      return collection(db, 'Elections', 'Votes', 'City', city, 'District')
    }

    return collection(db, 'Elections', 'Votes', 'City')
  },
}

export const documentRefs = {
  electionRef(city, district) {
    if (city && district) {
      return doc(collectionRefs.currentElectionRef(city), district)
    }

    if (city) {
      return doc(collectionRefs.currentElectionRef(), city)
    }

    return doc(collection(db, 'Elections'), 'Votes')
  },
}
