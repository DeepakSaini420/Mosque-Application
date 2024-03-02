import { initializeApp } from 'firebase/app';
import { collection,doc,getDoc,onSnapshot,getFirestore, updateDoc, setDoc, Unsubscribe,getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, getRedirectResult, signOut } from 'firebase/auth'
import { Mosques,Prayer } from '../redux/mosques/mosqueSlice';
// import { MosqueRef } from './collectionRef';

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

const getAllMosquesNames = async (): Promise<any> => {
  const docsSnap =await getDocs(mosqueRef);
  const mosques:any = [];
  docsSnap.docs.map((doc:any)=>{
    mosques.push({...doc.data(),id:doc.id});
  })

  return mosques
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

const getLiveMosqueData = ({ id }:{id:string}):any => {
  const documentRef = collection(db,'mosques',id,'Prayers');
  const mosquePrayers:Prayer[] = [];
  const unsubscribe =  onSnapshot(documentRef,(docSnap)=>{
      docSnap.docs.forEach((doc)=>{
        if(doc.exists()){
          const data = doc.data();
          console.log(data);
          mosquePrayers.push({month:data.month,prayers:data.prayer});
        }
      })
    })

  return unsubscribe;
}

const addTokenToMosque = async(token:string,mosqueName:string) =>{
  const mosqueRef = doc(db,"mosques",mosqueName);

  const data = (await getDoc(mosqueRef)).data();

  let tokens:string[] = data?.Tokens || [];

  let isPresent = tokens.find(tok => token===tok);

  if(isPresent) return;

  tokens.push(token);

  try {
    const resp = await updateDoc(mosqueRef,{
      Tokens:tokens
    });
  } catch (error) {
    console.log(error);
  }
}

const addMessageToMosque = async(message:string,mosqueName:string)=>{
  
  const notificationsRef = doc(db,"notifications",mosqueName);

  const data = (await getDoc(notificationsRef)).data();

  let messages:string[] = data?.Messages;
  
  messages.push(message);

  await updateDoc(notificationsRef,{
    Messages:messages
  })

}

const getMessages = async(mosqueName:string,callback:CallableFunction):Promise<any>=>{

  const notificationsRef = doc(db,"notifications",mosqueName);

  const unsubscribe =  onSnapshot(notificationsRef,(docSnap)=>{
    if(docSnap.exists()){
      console.log(docSnap.data());
      const Messages = docSnap.data().Messages;
      const name = docSnap.data().name;
      callback({Messages,name});
    }else{
      callback(null);
    }
  })

  return unsubscribe;

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
    addTokenToMosque,
    addMessageToMosque,
    signInWithGoogle,
    getLiveMosqueData,
    getMessages,
    SignOut
};