import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoKQqYy3jmwNno4hjJ02WcvnwSm7XmxX4",
    authDomain: "projectfiatlux-5a6ee.firebaseapp.com",
    projectId: "projectfiatlux-5a6ee",
    storageBucket: "projectfiatlux-5a6ee.appspot.com",
    messagingSenderId: "808493746208",
    appId: "1:808493746208:web:ae7978a1e4e327b0f79445",
    measurementId: "G-Z2Q7MXSTJP"
  };
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app)

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export default storage;
  // export default app;
  