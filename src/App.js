import logo from './logo.svg';
import './App.css';
import Log from './Log.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.js';
import LdE from './LdE.js';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Log/>} />
        <Route path='home' element={<Home/>} />
        <Route path='lde' element={<LdE/>} />

    {/* <div className="App">
      <header className="App-header">
      <Log />
      </header>
    </div> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
