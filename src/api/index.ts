import { initializeApp } from 'firebase/app';
import { collection,doc,getDoc,onSnapshot,getFirestore, query, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, getRedirectResult, signOut } from 'firebase/auth'
import { Mosques,Prayer } from '../redux/mosques/mosqueSlice';

const firebaseConfig = {
    apiKey: "AIzaSyAfCoirSuXCGdS6LUwoTapyktTm7_SwLsk",
    authDomain: "mosque-5260e.firebaseapp.com",
    projectId: "mosque-5260e",
    storageBucket: "mosque-5260e.appspot.com",
    messagingSenderId: "510333356445",
    appId: "1:510333356445:web:5bbc5c78d4352e3ec4c774"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

const mosqueRef = collection(db,'mosques');

const getAllMosquesNames = async ():Promise<Mosques[]>=>{
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(mosqueRef, (docSnap) => {
          const mosqueName:Mosques[] = [];
          docSnap.docs.forEach((doc) => {
            if (doc.exists()) {
              const name = doc.data();
              mosqueName.push({name: name.name ,id: doc.id,location:name.location});
            }
          });
          resolve(mosqueName);
        }, (error) => {
          console.error('Error fetching mosque names:', error);
          reject(error);
        });
      });
}

const getMosqueData = ({ id }:{id:string}):Promise<Prayer[]> => {
  return new Promise(async (reslove,reject)=>{
    const documentRef = collection(db,'mosques',id,'Prayers');
    const mosquePrayers:Prayer[] = [];
    try {
      onSnapshot(documentRef,(docSnap)=>{
        docSnap.docs.forEach((doc)=>{
          if(doc.exists()){
            const data = doc.data();
            mosquePrayers.push({month:data.month,prayers:data.prayer});
          }
        })
        reslove(mosquePrayers);
      })
    } catch (error) {
      reject(error);
    }
  })
}

const signUpUser = async(email:string,password:string)=>{
  try {
    const data = await createUserWithEmailAndPassword(auth,email,password);
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}

const loginUser = async(email:string,password:string)=>{
  try {
    const data = await signInWithEmailAndPassword(auth,email,password);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const signInWithGoogle = async()=>{
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth,provider);

    const result = await getRedirectResult(auth);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

const SignOut = async()=>{
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
    getAllMosquesNames,
    getMosqueData,
    signUpUser,
    loginUser,
    signInWithGoogle,
    SignOut
};