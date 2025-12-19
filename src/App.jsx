import './index.css';
import DashBoard from './Dashboard';
import Navbar from './Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import CourseProvider from './context/CourseProvider';
import Profile from './Profile';

function App() {
  return ( 
    <CourseProvider>
      <Router>
        <div className='app'>
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path='/' element={<DashBoard />} />
              <Route path='/courseList' element={<CourseList />} />
              <Route path='/courseForm' element={<CourseForm />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CourseProvider>
   )
}

export default App
