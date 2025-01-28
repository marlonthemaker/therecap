import { connectFirestoreEmulator, getFirestore, Firestore } from 'firebase/firestore';
import { app } from './firebase';

const db: Firestore = getFirestore(app);

// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, 'localhost', 8080)
// }

export default db;