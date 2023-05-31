import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PublicAllItem from './pages/PublicAllItem';
import useAuthCheck from './hooks/useAuthCheck';
import DashboardLayout from './Layout/DashboardLayout';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './Layout/PrivateRoute';
import PublicRoute from './Layout/PublicRoute ';
import Modal from 'react-modal';
import PdfCreate from './pages/PdfCreate';
import UserEdit from './pages/UserEdit';

Modal.setAppElement('#root');

function App() {


  const authCheck = useAuthCheck()

  console.log(authCheck)

  return !authCheck ? (
    <div>Auth Checking..........</div>
  )
    : (
      <>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<PublicRoute>
            <SignIn />
          </PublicRoute>} />
          <Route path='/sign-up' element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>} />
          <Route element={<DashboardLayout />}>
            <Route path='/' element={<PublicRoute><PublicAllItem /></PublicRoute>} />
            <Route path='/pdf' element={<PublicRoute><PdfCreate/></PublicRoute>} />
            <Route path='/user-dashboard' >
              <Route path='' element={<PrivateRoute> <UserDashboard /> </PrivateRoute>} />
              <Route path='edit/:id' element={<PrivateRoute> <UserEdit /> </PrivateRoute>} />
            </Route>
            {/* <Route path='/edit/:id' element={<PrivateRoute>
              <UserDashboard />
            </PrivateRoute>} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
      </>
    )
}

export default App
