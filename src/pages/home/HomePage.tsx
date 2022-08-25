import React from 'react';
import axurLogo from '../../../assets/AxurLogo.png';
import './App.css';

function HomePage() {
  return (
    <body>
    <main>
    <section className="mainColumn-left">
    <div className="topBar">
    <img className="topBar-logo" alt="Axur logo" src={axurLogo}/>
    <h1 className="topBar-name">Axur Search</h1>
    </div>
    <div className="search-wrapper">
    <SearchBar />
    </div>
    </section>
    <section className="mainColumn-right">
    <SearchHistory />
    </section>
    </main>
    </body>
  );
}

export default HomePage;
