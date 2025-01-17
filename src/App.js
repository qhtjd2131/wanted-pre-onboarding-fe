import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
// import PreAssignmentGuide from './pages/PreAssignmentGuide';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
