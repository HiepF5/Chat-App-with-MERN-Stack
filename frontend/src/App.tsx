import './App.css'
// import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import SignUp from './pages/signup/SignUp';
// import { useAuthContext } from './context/AuthContext';
function App() {
  return (
    <>
        <div className="p-4 h-screen flex items-center justify-center">
          <Home />

          {/* <Routes>
            <Route
              path="/"
              element={<Home /> }
            />
            <Route
              path="/login"
              element={ <Login />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
          </Routes> */}
          {/* <Toaster /> */}
        </div>
    </>
  );
}

export default App
