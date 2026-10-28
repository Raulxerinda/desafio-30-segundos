
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDqC11Q37eHVDaxq1xuVQnyrNol4jqq97E',
  authDomain: 'segundos-online.firebaseapp.com',
  databaseURL: 'https://segundos-online-default-rtdb.firebaseio.com',
  projectId: 'segundos-online',
  storageBucket: 'segundos-online.firebasestorage.app',
  messagingSenderId: '391526700735',
  appId: '1:391526700735:web:4f7792f9c7867ec43c180a',
  measurementId: 'G-YHM4Q6Z5RV'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const database = getDatabase(app)

export const authReady = signInAnonymously(auth)
  .then((credential) => credential.user)

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) getAnalytics(app)
    })
    .catch((error) => {
      console.warn('Analytics não disponível:', error)
    })
}
