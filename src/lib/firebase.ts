import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
import { initializeApp, getApps } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'therecappoc.firebaseapp.com',
  projectId: 'therecappoc',
  storageBucket: 'therecappoc.firebasestorage.app',
  messagingSenderId: '991851770771',
  appId: '1:991851770771:web:a9b94566de5b5c631dee66',
  measurementId: 'G-HZ2JJPCHLF',
}
let app: FirebaseApp;

// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099')
// }

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { 
  app,
  auth,
  googleAuthProvider 
};