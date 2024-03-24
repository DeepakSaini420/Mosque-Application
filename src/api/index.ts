import { initializeApp } from 'firebase/app';
import { collection,doc,getDoc,onSnapshot,getFirestore, updateDoc, setDoc, Unsubscribe,getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
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

const getMosquePrayers = async (id:string):Promise<Prayer[]> =>{
  const prayersRef = collection(db,"mosques",id,"Prayers");
  const q = query(prayersRef,orderBy("month"));
  const prayerDocs = await getDocs(q);
  const mosquePrayers:Prayer[] = [];
  prayerDocs.docs.map((doc:any)=>{
    const data = doc.data();
    mosquePrayers.push(data);
  })
  return mosquePrayers;
}

// const getLiveMosqueData = (id:string,callback:CallableFunction):any => {
//   const documentRef = collection(db,'mosques',id,'Prayers');
//   const mosquePrayers:Prayer[] = [];
//   const unsubscribe =  onSnapshot(documentRef,(docSnap)=>{
//       docSnap.docs.forEach((doc)=>{
//         if(doc.exists()){
//           const data = doc.data();
//           console.log(data);
//           mosquePrayers.push({month:data.month,prayers:data.prayer});
//         }
//       })

//       callback(mosquePrayers);
//     })

//   return unsubscribe;
// }

const addTokenToMosque = async(token:string,mosqueName:string) =>{
  const mosqueRef = doc(db,"mosques",mosqueName);
  const isChangeRef = doc(db,"isChange","change");

  const data = (await getDoc(mosqueRef)).data();


  let tokens:string[] = data?.Tokens || [];

  let isPresent = tokens.find(tok => token===tok);
  console.log(data);
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

const getRealTimeUpdates = async(callback:CallableFunction)=>{
  const unsub = onSnapshot(doc(db,'isChange','change'),(doc)=>{
    if(doc.exists()){
      const data = doc.data();
      const hash = data.hash;

      callback(hash);
    }
  })

  return unsub;
}

export {
    getAllMosquesNames,
    getMosqueData,
    signUpUser,
    addTokenToMosque,
    getMosquePrayers,
    addMessageToMosque,
    getMessages,
    getRealTimeUpdates
};