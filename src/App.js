
import { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import {
    HomePage,
    ZhurnalStudentPage,
    HometaskStudentPage,
    AbsenteeismStudentPage,
    TimeTableStudentPage,
    CreatePost, AdminPage
} from './pages'
import {Login, NavMenu} from './components'
import './styles/css/App.css'
import axios from "axios";

function App() {

    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    })

    const [User, setUser] = useState({})


  return (
    <div className="App">
        {User.isLoginned ?   <div><div className='nav'><NavMenu role={User.roles} setUser={setUser} /></div> <div className='content'>
            <Routes>
                <Route path='/' element={<HomePage api={api}/>} />
                <Route path={'/login'} render={(props) => (
                    <Login {...props} setUser={setUser} />
                )}/>
                <Route path='/CreatePost' element={<CreatePost />} />
                <Route path='/ZhurnalStudentPage' element={<ZhurnalStudentPage user={User} />} />
                <Route path='/HometaskStudentPage' element={<HometaskStudentPage />} />
                <Route path='/AbsenteeismStudentPage' element={<AbsenteeismStudentPage />} />
                <Route path='/TimeTableStudentPage' element={<TimeTableStudentPage />} />
                <Route path='/AdminPage' element={<AdminPage user={User} api={api} />} />
                <Route path={'*'} element={<h1 className='Error'>PAGE NOT FOUND</h1>} />
            </Routes>
        </div> </div> : <Login user={User} setUser={setUser} />}

    </div>
  );
}

export default App;
