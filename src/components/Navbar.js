import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar({setUser}) {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Kiertotalous</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <div id="logout" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </nav>
  )
}
