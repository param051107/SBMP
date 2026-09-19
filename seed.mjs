import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdSuua8EQvc685BrwxWQRSowyvmTVg01k",
  authDomain: "param-garba-react-2026.firebaseapp.com",
  projectId: "param-garba-react-2026",
  storageBucket: "param-garba-react-2026.firebasestorage.app",
  messagingSenderId: "390219090723",
  appId: "1:390219090723:web:ef3b921a3e9afbfbba9a96",
  version: "2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Seeding password...");
  await setDoc(doc(db, "settings", "admin"), {
    password: "SBMP@123"
  });
  console.log("Done!");
  process.exit(0);
}

seed();
