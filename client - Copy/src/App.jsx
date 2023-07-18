import './App.css'
import Chat from './Chat';
import RegisterAndLogin from './RegisterAndLogin';
import axios from "axios";
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
//  axios.defaults.baseURL = "http://localhost:8082";
 axios.defaults.withCredentials = true;
  return (
    <>
    <BrowserRouter>
       <Routes>
       <Route path = "/" element = {<RegisterAndLogin/>} />
        <Route path = "/chat" element = {<Chat/>} />
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
