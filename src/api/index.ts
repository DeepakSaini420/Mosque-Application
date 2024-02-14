import { initializeApp } from 'firebase/app';
import { collection,doc,getDoc,onSnapshot,getFirestore, updateDoc, setDoc, Unsubscribe } from 'firebase/firestore';
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

// export const func1 = async()=>{
//   return MosqueRef.onSnapshot(
//     async querySnapshot => {
//       if(querySnapshot.size>0){
//         await querySnapshot.forEach(async documentSnaphot=>{
//           console.log(documentSnaphot.data());
//         })
//       }
//     }
//   )
// }

const getAllMosquesNames = async (callback:CallableFunction):Promise<Unsubscribe>=>{
    // const promise = Promise.all([new Promise((resolve,reject)=>{
    //   const unsubscribe = onSnapshot(mosqueRef, (docSnap) => {
    //     let mosqueName:Mosques[] = [];
    //     docSnap.docs.forEach((doc) => {
    //       if (doc.exists()) {
    //         const data = doc.data();
    //         mosqueName.push({name: data.name ,id: doc.id,location:data.location,Messages:data.Messages,Tokens:data.Tokens});
    //       }
    //     });
    //     resolve(mosqueName);
        
    //   }, (error) => {
    //     console.error('Error fetching mosque names:', error);
    //     reject(error);
    //   });
    // })]);
    //   const data = await promise;
    //   console.log(data)
    //   if(callback) console.log("callback Present");
    //   callback && callback(data[0]);
    //   return promise;

    const unsubscribe = onSnapshot(mosqueRef, (docSnap) => {
          let mosqueName:Mosques[] = [];
          docSnap.docs.forEach((doc) => {
            if (doc.exists()) {
              const data = doc.data();
              mosqueName.push({name: data.name ,id: doc.id,location:data.location,Messages:data.Messages,Tokens:data.Tokens});
            }
          });
          callback(mosqueName);
        }, (error) => {
          console.error('Error fetching mosque names:', error);
        });
        
  return unsubscribe;
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
  
  const mosqueRef = doc(db,"mosques",mosqueName);

  const data = (await getDoc(mosqueRef)).data();

  let messages:string[] = data?.Messages;
  
  messages.push(message);

  await updateDoc(mosqueRef,{
    Messages:messages
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
    addTokenToMosque,
    addMessageToMosque,
    signInWithGoogle,
    SignOut
};