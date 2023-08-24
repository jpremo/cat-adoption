import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdoptPage from './components/adopt-page/adopt-page';
import CatDetailsPage from './components/cat-details-page/cat-details-page';
import Header from './components/header/header';
import HomePage from './components/home-page/home-page';
import AddCatPage from './components/add-cat-page/add-cat-page';
import './app.css';

function App() {
    return (
        <BrowserRouter>
            <div style={{ textAlign: 'center' }}>
                <Header />
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/adopt" element={<AdoptPage />} />
                    <Route path="/add-cat" element={<AddCatPage />} />
                    <Route path="/cat/:from/:catId" element={<CatDetailsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
