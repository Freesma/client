
import { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import {
    HomePage,
    JournalStudentPage,
    HometaskStudentPage,
    AbsenteeismStudentPage,
    TimeTableStudentPage,
    AdminPage, JournalTeacherPage
} from './pages'
import {AbsenteeismContainer, Login, NavMenu} from './components'
import './styles/css/App.css'
import axios from "axios";
import AbsenteeismTeacherPage from "./pages/AbsenteeismTeacherPage";
import GroupContainer from "./components/GroupContainer";

function App() {

    const api = axios.create({
        baseURL: 'http://localhost:7000/'
    })

    const [User, setUser] = useState({isLoginned: true})


  return (
    <div className="App">
        <div>
            <div className='nav'><NavMenu role={User.roles} setUser={setUser} /></div> 
            <div className='content'></div>
        </div>
            <Routes>
                <Route path='/' element={<HomePage api={api}/>} />
                <Route path={'/login'} render={(props) => (
                    <Login {...props} setUser={setUser} />
                )}/>
                <Route path={'/AbsenteeismTeacherPage'} element={<AbsenteeismTeacherPage api={api} user={User} />} />
                <Route path={'/AbsenteeismTeacherPage/:id'} element={<AbsenteeismContainer api={api} user={User} />} />
                <Route path='/JournalStudentPage' element={<JournalStudentPage api={api} user={User} />} />
                <Route path='/JournalTeacherPage' element={<JournalTeacherPage api={api} user={User} />} />
                <Route path='/JournalTeacherPage/:id' element={<GroupContainer api={api} user={User} />} />
                <Route path='/HometaskStudentPage' element={<HometaskStudentPage api={api} user={User} />} />
                <Route path='/AbsenteeismStudentPage' element={<AbsenteeismStudentPage user={User} api={api} />} />
                <Route path='/TimeTableStudentPage' element={<TimeTableStudentPage />} />
                <Route path='/AdminPage' element={<AdminPage user={User} api={api} />} />
                <Route path={'*'} element={<h1 className='Error'>PAGE NOT FOUND</h1>} />
            </Routes>
        

    </div>
  );
}

export default App;
