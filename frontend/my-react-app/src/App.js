import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authentication from './Context/Authentication'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'



function App() {
  return (

    <div className="App">
      <Router>
        <Authentication>
          <Header />
          <Routes>
            <Route path='/' element={<PrivateRoute Component={HomePage} />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Authentication>
      </Router>
    </div>
  );
}

export default App;
