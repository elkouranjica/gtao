/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../components/Layout'
import Dashboard from './Dashboard'


function Accueil() {
  const backgroundImageStyle = {
    backgroundImage: 'url(dgfs.png)',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh', // Hauteur de la fenêtre
  };
  return (
    <Layout>
      <div className="bg-image" style={backgroundImageStyle}/>
    </Layout>
  )
}

export default Accueil