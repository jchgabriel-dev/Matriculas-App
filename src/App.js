import './App.css';
import Navbar from './components/Navbar';

import Students from './components/Students';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom"
import Courses from './components/Courses';

function App() {
     
  return (
    <div> 
  
    <Navbar/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/students" element={<Students/>} />
        <Route path="/courses" element={<Courses/>} />
      </Routes>
    </div>
    </div>
    
  )
}

export default App;
