import Navbar from "./Navbar/Navbar";
import React, { Suspense, useContext ,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from "./Hooks/AuthContext";
import { useAuth } from "./Hooks/useAuth";

import Login from "./Login/Login";
import SearchBar from "./SearchBar/SearchBar";

function App() {
 
  const auth = useContext(AuthContext);
  const { token, login, logout, email } = useAuth();

  var routes;
  // token acts as a variable for whether a user is logged is logged in or not
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<SearchBar />} />\

        {/* Add more routes as needed */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<SearchBar />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, email: email, login: login, logout: logout }}>
      <Router>
        <div className=" App min-h-screen max-h-screen min-w-screen  flex flex-col">
          <div >
            <Navbar />
          </div>
          <div className="flex-1 bg-white justify-center overflow-hidden"
               style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
          >
            <Suspense fallback={<div className="center"></div>}>
              <Routes>{routes}</Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
