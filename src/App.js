import logo from './logo.svg';
import './App.css';
import Log from './Log.js';
import {BrowserRouter, Routes, Route, useLocation, HashRouter} from 'react-router-dom'
import Home from './Home.js';
import LdE from './LdE.js';
import { GlobalContext, GlobalStorage } from './GlobalContext';
import LdENovoReg from './LdENovoReg';
import AreaParaTestes from './AreaParaTestes';
import LdeEdit from './LdeEdit';
import Hidrantes from './Hidrantes';
import HidranteNovo from './HidranteNovo';
import HidranteEdit from './HidranteEdit';
import Extintores from './Extintores';
import ExtNovo from './ExtNovo';
import ExtEditar from './ExtEditar';
import Header from './Header';
import Gas from './Gas';
import GasNovo from './GasNovo';
import GasEdit from './GasEdit';
import React, { useContext } from 'react';
import Login from './Login';
import Salas from './Salas';
import Profile from './Profile';
import NotFound from './NotFound';


function App() {

  return (
    <BrowserRouter basename="/" >
      <GlobalStorage>
        {/* <Header/> */}

        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='perfil' element={<Profile/>} />

          {/* <Route path='/' element={<AreaParaTestes/>} /> */}
          <Route exact path='testes' element={<AreaParaTestes/>} />

          <Route exact path='home' element={<Home/>} >

            <Route exact path='lde' element={<LdE/>} />
            <Route exact path='hd' element={<Hidrantes/>} />
            <Route exact path='ext' element={<Extintores />} />
            <Route exact path='gas' element={<Gas/>} />
            {/* <Route exact path='lde' element={<LdE/>} /> */}
            <Route exact path='lde/ldenovo' element={<LdENovoReg/> } />
            <Route exact path='lde/edit/:id' element={<LdeEdit/> } />

          </Route>
            


          <Route exact path='hdnovo' element={<HidranteNovo/> } />
          <Route exact path='/hd/:id' element={<HidranteEdit />} />

          <Route exact path='extnovo' element={<ExtNovo/>} />
          <Route exact path='/ext/:extedit' element={<ExtEditar/>} />

          <Route exact path='gasnovo' element={<GasNovo/>} />
          <Route exact path='/gas/:gasnovo' element={<GasEdit/>}/>

          <Route exact path='sala' element={<Salas/>} />


          <Route exact path='*' element={<NotFound />} />
          
        </Routes>

      </GlobalStorage>
    </BrowserRouter>
  );
}

export default App;
