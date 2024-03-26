import React from 'react'
import ReactDOM from 'react-dom/client'

//Pages
import Header from '@components/Header/Header.jsx'
import Footer from '@components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

//css global
import './app.css'

//Fonction pour renvoyer la bonne page (React-rooter), * est la path par défaut si il n'y a pas de page ou qu'il y a un problème
function App(){
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;