import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Visitors from './pages/Visitors';
import Pass from './pages/Pass';
import NavBar from './components/NavBar';
import RegisterUser from './pages/RegisterUser';
import { useAuth } from './context/AuthContext'
function App() {
     const { token } = useAuth();
    return (
        
    <BrowserRouter>
            {token && <NavBar />}
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterUser/>}/>
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path='/visitor' element={<ProtectedRoute><Visitors/></ProtectedRoute>}/>
            <Route path='/pass' element={<ProtectedRoute><Pass/></ProtectedRoute>}/>
            <Route path='/' element={<h1 className='bg-gray-500 p-4 m-4 text-info'>Home Page</h1>}/>

        </Routes>
    </BrowserRouter>
);
}

export default App;