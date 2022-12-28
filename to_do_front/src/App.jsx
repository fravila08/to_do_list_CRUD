import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import axios from 'axios'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MyTasks from './pages/MyTasks';
import AppNav from './components/AppNav';
import { useEffect } from 'react';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken']= csrftoken

function App() {
  const [user, setUser] = useState(null)

  async function curr_user(){
    const response = await axios.get('curr_user')
    const user = response.data && response.data[0] && response.data[0].fields  
    setUser(user)
  }

  useEffect(()=>{
    curr_user()
  },[])

  return (
    <div className="App">
      <h1>To Do List</h1>
      {user && <p>Welcome, {user.name}</p>}
      <AppNav user={user}/>
      <Router>
        <Routes>
          <Route path="" element={<MyTasks user={user} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
