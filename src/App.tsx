import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from "./hooks";
import { store } from "./store";

import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Docs from "./components/Pages/Docs";
import About from "./components/Pages/About";
import Users from "./components/Pages/Users";
import UserProfile from "./components/Pages/UserProfile";
import CreateUser from "./components/Pages/CreateUser";

function App() {
  const [activeNav, setActiveNav] = useState("home");
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app">
          <BrowserRouter>
            <Navbar activeKey={activeNav} onChange={setActiveNav} />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/:id" element={<UserProfile />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;