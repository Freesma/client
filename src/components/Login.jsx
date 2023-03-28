import axios from 'axios';
import {  useState, } from 'react';
const React = require('react')


const api = axios.create({
   baseURL: 'http://localhost:5000/'
})






function Login(props){


   const [Error, setError] = useState("");

   function isUser(log, pass) {
         if(log === '' && pass === ''){
            setError('Введіть дані')
         } else {
            setError('')
            api.get(`/users/${log}-${pass}`).then(res => {
               if(res.data[0].login === log && res.data[0].pass === pass) {
                  let user = res.data[0]
                     user.roles.map((r) => {
                        switch (r) {
                           case 'Student':
                              api.get('/students/by-user/'+user.id).then(res2 => {
                                 user = (Object.assign({}, user, {isLoginned: true, group_id: res2.data.group_id, student_id: res2.data.id} ));
                                 props.setUser(user)
                              })
                                break
                           case 'Admin':
                              api.get('/admins/by-user/'+ user.id).then(res2 => {
                                 user = (Object.assign({}, user, {isLoginned: true, admin_id: res2.data.id}))
                                 props.setUser(user)
                              })
                                break
                           case 'Teacher':
                              api.get('/teachers/'+user.id).then(res3 => {
                                 user = (Object.assign({}, user, {
                                    isLoginned: true,
                                    teacher_id: res3.data.id,
                                    subjects: res3.data.subjects_id,
                                    groups: res3.data.groups_id
                                 } ));
                                 props.setUser(user)
                              })
                              break
                        }

                     })

               }

            })
         }
      }


   return (
      <div className='login' id='log'>
         <div className="login-block">
            <h3>Вхід</h3>
            <input className='log-pass' id='loginField' type="text" placeholder='Логін'/>
            <input className='log-pass' id='passwordField' type="password" placeholder='Пароль'/>
            <p id='error'>{Error}</p>
            <input className='btn' type="button" value="Ввiйти" onClick={(() => {
               var text = document.getElementById("loginField")
               var logi = text.value
               text = document.getElementById("passwordField")
               var pass = text.value
               isUser(logi, pass)
            })} />
         </div>
      </div>
   );

}

export default Login;
