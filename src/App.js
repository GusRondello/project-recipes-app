import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from './Routes';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer
        autoClose={ 3000 }
        position="bottom-center"
      />
    </>
  );
}

export default App;
