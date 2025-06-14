import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Info from '../components/Info';

export default function Login({url,setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logginIn, setLogginIn] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    setLogginIn(true);

    const json = JSON.stringify({email: email,password: password})
    axios.post(url + 'users',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then ((response) => {
      setUser(response.data);
      setLogginIn(false);
      navigate('/');
    }).catch (error => {
      setLogginIn(false);
      alert(error);
    })
  }

  if (!logginIn) {
    return (
      <form>
        <h3>Kirjautuminen</h3>
        <div className="mb-3">
          <label className="form-label">Sähköposti</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" value={password} onChange={e => setPassword(e.target.value)}>Salasana</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={login}>Kirjaudu</button>
      </form>
    )
  } else {
    return (
      <div className='info-div'>
        <Info text="Kirjaudutaan..." />
      </div>
    )
  }
}
