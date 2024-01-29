import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Index from './src';
import store  from './src/redux/store';
import Auth from './src/screens/Auth';
import { auth } from './src/api';
import { onAuthStateChanged } from 'firebase/auth';

const App = (): JSX.Element => {
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    })
  },[]);

  return (
    <Provider store={store}>
      {isLoggedIn ? <Index/> : <Auth/>}
    </Provider>
  );
};

export default App;
