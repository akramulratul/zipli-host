import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import Navbar from "./components/Navbar";

const URL = process.env.REACT_APP_API_URL || "https://json-s3t4.onrender.com";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar setUser={setUser} />
      <div className="container">
        {(() => {
          if (!user) {
            return <Login url={URL} setUser={setUser} />;
          } else {
            return (
              <Routes>
                <Route path="/" element={<Home url={URL} user={user} />} />
                <Route
                  path="/login"
                  element={<Login url={URL} setUser={setUser} />}
                />
              </Routes>
            );
          }
        })()}
      </div>
    </>
  );
}

export default App;
