import logo from './logo.svg';
import './App.css';
import Log from './Log.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.js';
import LdE from './LdE.js';
import { GlobalStorage } from './GlobalContext';
import LdENovoReg from './LdENovoReg';
import AreaParaTestes from './AreaParaTestes';
import LdeEdit from './LdeEdit';

function App() {

  return (
    <BrowserRouter>
      <GlobalStorage>

        <Routes>
          {/* <Route path='/' element={<AreaParaTestes/>} /> */}
          <Route path='/' element={<Log/>} />
          <Route path='home' element={<Home/>} />
          <Route path='lde' element={<LdE/>} />
          <Route path='ldenovo' element={<LdENovoReg/> } />
          <Route path='/lde/edit/:id' element={<LdeEdit/> } />
          <Route path='testes' element={<AreaParaTestes/>} />
        </Routes>

      </GlobalStorage>
    </BrowserRouter>
  );
}

export default App;
