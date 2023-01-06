import logo from './logo.svg';
import './App.css';
import Log from './Log.js';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './Home.js';
import LdE from './LdE.js';
import { GlobalStorage } from './GlobalContext';
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
import React from 'react';
import Login from './Login';
import Salas from './Salas';

function App() {
  // const location = useLocation()

  // React.useEffect(()=>{
  //   console.log('RENDER')

  // },[location])

  return (
    <BrowserRouter>
      <GlobalStorage>
        {/* <Header/> */}

        <Routes>
          {/* <Route path='/' element={<AreaParaTestes/>} /> */}
          <Route path='testes' element={<AreaParaTestes/>} />
          {/* <Route path='/' element={<Log/>} /> */}
          <Route path='/' element={<Login/>} />
          <Route path='home' element={<Home/>} />

          <Route path='lde' element={<LdE/>} />
          <Route path='ldenovo' element={<LdENovoReg/> } />
          <Route path='/lde/edit/:id' element={<LdeEdit/> } />

          <Route path='hd' element={<Hidrantes/>} />
          <Route path='hdnovo' element={<HidranteNovo/> } />
          <Route path='/hd/:id' element={<HidranteEdit />} />

          <Route path='ext' element={<Extintores />} />
          <Route path='extnovo' element={<ExtNovo/>} />
          <Route path='/ext/:extedit' element={<ExtEditar/>} />

          <Route path='gas' element={<Gas/>} />
          <Route path='gasnovo' element={<GasNovo/>} />
          <Route path='/gas/:gasnovo' element={<GasEdit/>}/>

          <Route path='sala' element={<Salas/>} />
          
        </Routes>

      </GlobalStorage>
    </BrowserRouter>
  );
}

export default App;
