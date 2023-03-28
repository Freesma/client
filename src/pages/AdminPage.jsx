import React, {useEffect, useState} from "react";
import TeacherOption from "../components/TeacherOptions";


function AdminPage(props) {

    const [Posts, setPosts] = useState([])
    const [Post, setPost] = useState('')
    const [PostTitle, setPostTitle] = useState('')
    const [PostText, setPostText] = useState('')
    const [Groups, setGroups] = useState([]);
    const [Subjects, setSubjects] = useState([]);
    const [Professions, setProfessions] = useState([]);

    //Register new User
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Role, setRole] = useState('');
    const [Teachers, setTeachers] = useState([]);
    const [Teacher, setTeacher] = useState('');


    useEffect(() => {
        props.api.get('/posts').then(res => {
            setPosts(res.data)
            setPostTitle(res.data[0].topic)
            setPostText(res.data[0].text)
        })
        props.api.get('/groups').then(res => {
            setGroups(res.data)
        })
        props.api.get('/teachers').then(res => {
            setTeachers(res.data)
        })
        props.api.get('/subjects').then(res => {
            setSubjects(res.data)
        })
        props.api.get('/professions').then(res => {
            setProfessions(res.data)
        })
    }, []);


    function createPost(title, text) {
        props.api({
            method: 'post',
            url: '/posts',
            'Access-Control-Allow-Origin': true,
            data: {
                topic: title,
                text: text
            }
        })
    }


    function deletePost(id) {
        props.api.delete('/posts/' + id)
    }

    return (
        <div className='AdminPage'>
            <div className="admin">
                <p>Адміністратор</p>
                <div className="name">
                    <p className="name">ID: {props.user.admin_id}</p>
                    <p className="name">Ім'я: {props.user.fname}</p>
                    <p className="name">Прізвище: {props.user.lname}</p>
                </div>
            </div>
            <div className="create-post">

                <h2>Створення Постів</h2>
                <select name="posts" id="posts" value={Post} onChange={(e) => {
                    setPost(e.target.value);
                    const id = e.target.value.split(' ')[0].split('.')[0]
                    const post = Posts.filter(post => post.id === Number(id))[0]
                    setPostTitle(post.topic)
                    setPostText(post.text)
                }}>
                    {Posts.map((post) => <option>{post.id + '. ' + post.topic}</option>)}
                </select>
                <p>Назва посту</p>
                <input type="text" value={PostTitle} onChange={(e) => setPostTitle(e.target.value)} className="title"
                       id='title'/>
                <p>Текст посту</p>
                <textarea type="text" value={PostText} onChange={(e) => setPostText(e.target.value)} className="text"
                          id='text'/>
                <div className="buttons">
                    <button onClick={() => {
                        if (PostTitle === '' || PostText === '') {
                            alert("Введіть назву та текст для поста!")
                        } else {
                            createPost(PostTitle, PostText)
                            alert('Пост створено успішно')
                            props.api.get('/posts').then(res =>
                                setPosts(res.data)
                            )
                            setPostTitle('')
                            setPostText('')
                        }
                    }}>Створити
                    </button>

                    <button onClick={() => {
                        setPostTitle('')
                        setPostText('')
                    }}>Очистити
                    </button>

                    <button onClick={() => {
                        const id = Post.split(' ')[0].split('.')[0]
                        deletePost(id)
                        alert(`Пост "${Post}" видалено успішло`)
                        setPosts(Posts.filter(post => post.id !== Number(id)))
                        setPostTitle('')
                        setPostText('')
                    }}>Видалити
                    </button>
                </div>
            </div>


            {/*CREATE GROUP*/}
            <div className="create-group">
                <h2>Створення Нової Групи</h2>
                <label htmlFor="">Виберіть курс</label>
                <select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                </select><br/>
                <label htmlFor="">Виберіть професію</label>
                <select name="" id="">
                    {Professions.map(pr => <option value="">{pr.id + ' ' + pr.name}</option>)}
                </select><br/>
                <label htmlFor="">Виберіть куратора</label>
                <select name="" id="">
                    {Teachers.map(teacher => <TeacherOption api={props.api} id={teacher.user_id}/>)}
                </select><br/>
                <label htmlFor="">Введіть назву групи</label>
                <input type="text"/><br/>

                    <button className={'btn'}>Створити</button>
                    <button className={'btn'}>Видалити</button>
            </div>


            <div className="create-subjects">
                <h2>Створення Предметів</h2>
                <label htmlFor="">Виберіть викладача</label>
                <select name="" id="">
                    {Teachers.map(teach => <TeacherOption api={props.api} id={teach.user_id}/>)}
                </select><br/>
                <label htmlFor="">Виберіть групу</label>
                <select name="" id="">
                    {Groups.map(gr => <option value="">{gr.id + '. ' + gr.name}</option>)}
                </select><br/>
                <label htmlFor="">Введіть назву</label>
                <input type="text"/>

            </div>

            {/*CREATE TIME TABLE*/}
            <div className="create-ttable">
                <h2>Створення Розкладу</h2>
                <form action="">
                    <label htmlFor="">Виберіть вчителя: </label>
                    <select name="" id="" value={Teacher} onChange={e => setTeacher(e.target.value)}>
                        {Teachers.map(teach => <TeacherOption id={teach.user_id} api={props.api}/>)}
                    </select><br/>
                    <label htmlFor="">Виберіть групу: </label>
                    <select name="" id="">
                        {Groups.map(g => <option value="">{g.id + '. ' + g.name}</option>)}
                    </select><br/>
                    <label htmlFor="">Виберіть предмет: </label>
                    <select name="" id="">
                        {Subjects.map(sub => <option>{sub.id + '. ' + sub.name}</option>)}
                    </select><br/>
                    <label htmlFor="">Виберіть день: </label>
                    <input type="number" max={5} min={1}/><br/>
                    <label htmlFor="">Виберіть номер пари: </label>
                    <input type="number" max={4} min={1}/>
                </form>
            </div>


        </div>
    )
}

export default AdminPage


{/*<div className="create_users">*/
}
{/*    <h2>Користувачі</h2>*/
}
{/*    <form action="">*/
}
{/*        <label htmlFor="">Ім'я</label><br/>*/
}
{/*        <input type="text" value={FName} onChange={e => setFName(e.target.value)}/><br/>*/
}

{/*        <label htmlFor="">Прізвище</label><br/>*/
}
{/*        <input type="text" value={LName} onChange={e => setLName(e.target.value)}/><br/>*/
}

{/*        <label htmlFor="">Логін</label><br/>*/
}
{/*        <input type="text" value={Login} onChange={e => setLogin(e.target.value)}/><br/>*/
}

{/*        <label htmlFor="">Пароль</label><br/>*/
}
{/*        <input type="password" value={Password} onChange={e => setPassword(e.target.value)}/><br/>*/
}

{/*        <label htmlFor="">Номер телефону</label><br/>*/
}
{/*        <input type="text" value={Mobile} onChange={e => setMobile(e.target.value)}/><br/>*/
}

{/*        <label htmlFor="">Емейл</label><br/>*/
}
{/*        <input type="email" value={Email} onChange={e => setEmail(e.target.value)}/><br/>*/
}


{/*        <select name="roles" id="roles" value={Role} onChange={(e) => {*/
}
{/*            setRole(e.target.value)*/
}
{/*        }}>*/
}
{/*            <option>Студент</option>*/
}
{/*            <option>Викладач</option>*/
}
{/*            <option>Адмін</option>*/
}
{/*            <option>Викладач-Адмін</option>*/
}
{/*        </select>*/
}

{/*        <div className="roles">*/
}
{/*            {*/
}
{/*                Role === 'Студент' ? <div>*/
}
{/*                        <div>Виберіть групу для студента {LName} {FName}</div>*/
}
{/*                        <select name="groups" id="groups">*/
}
{/*                            {Groups.map(group => <option>{group.name}</option>)}*/
}
{/*                        </select>*/
}
{/*                </div> :*/
}
{/*                    Role === 'Викладач' ? <div>*/
}

{/*                    </div> :*/
}
{/*                        Role === 'Адмін' ? <div>*/
}

{/*                        </div> :*/
}
{/*                            Role === 'Викладач-Адмін' ? <div>*/
}

{/*                            </div> : <div></div>*/
}
{/*            }*/
}
{/*        </div>*/
}
{/*    </form>*/
}
{/*</div>*/
}