import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

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
