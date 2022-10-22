import logo from './logo.svg';
import './App.css';
import Log from './Log.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.js';
import LdE from './LdE.js';
import { GlobalStorage } from './GlobalContext';

function App() {

  return (
    <BrowserRouter>
      <GlobalStorage>

        <Routes>
          <Route path='/' element={<Log/>} />
          <Route path='home' element={<Home/>} />
          <Route path='lde' element={<LdE/>} />
        </Routes>

      </GlobalStorage>
    </BrowserRouter>
  );
}

export default App;
