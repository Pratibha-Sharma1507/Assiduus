import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';


const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/sidebar' element={<Sidebar/>}/>
        </Routes>
        
    </>
  );
};

export default App;
