import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { AuthContextProvider } from './context/AuthContext';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import SignUp from './components/Signup';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
    <AuthContextProvider>
    <BrowserRouter>
    
    <Routes>
      <Route path="/signup" exact element={<SignUp/>}></Route>
      <Route path="/login" exact element={<Login/>}></Route>
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
