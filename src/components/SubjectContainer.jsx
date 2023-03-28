import React, {useEffect, useState} from 'react';
import StudentsContainer from "./StudentsContainer";
import {useParams} from "react-router-dom";

const SubjectContainer = (props) => {

    const param = useParams()

    const [Students, setStudents] = useState([])
    const [Topic, setTopic] = useState('');
    const [Mark, setMark] = useState({})

    useEffect(() => {
        props.api.get('/students/by-group/' + param.id).then(res =>
            setStudents(res.data)
        )
    }, []);


    return (
        <div className={'subject-container'}>
            <h3>{props.subject.name}</h3>
            <div className="input-topic">
                <div className={'topic'}>Назва сьогоднішньої теми:</div>
                <input type="text" value={Topic} onChange={e => setTopic(e.target.value)}/>
            </div>
            <div className="students_con">
                <div className="stud_1">
                    {Students.map(student =>
                        <StudentsContainer api={props.api} setStudentMark={setMark} student={student} topic={Topic} user={props.user} subject={props.subject}/>
                    )}
                </div>
                <div className="stud_2">
                    <div>Студент: {Mark.lname} {Mark.fname}</div>
                    <div>Тема: {Mark.topic}</div>
                    <div>Дата: {Mark.date}</div>
                    <div>Оцінка: {Mark.mark}</div>
                    <div>
                        {/*<button>Редагувати</button>*/}
                        {/*<button>Видалити</button>*/}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SubjectContainer;
