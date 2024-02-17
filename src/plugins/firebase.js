// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAi09X9fMkVxenL30XpZyb8vp-sozWpCWI',
  authDomain: 'accuhit-lottery.firebaseapp.com',
  databaseURL:
    'https://accuhit-lottery-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'accuhit-lottery',
  storageBucket: 'accuhit-lottery.appspot.com',
  messagingSenderId: '689982736510',
  appId: '1:689982736510:web:3d62263672c5288535702f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)
const auth = getAuth(app)

export { auth, database }
