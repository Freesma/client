import React, {useEffect, useState} from 'react';
import {HomeTask} from "../components";

const HomeTaskStudentPage = (props) => {

    const [Subjects, setSubjects] = useState([])

    useEffect(() => {
        props.api.get('/subjects/by-group/' + props.user.group_id).then(res => {
            setSubjects(res.data)
        })
    }, []);

    return (
        <div>
            <div className='HometaskPage'>
                <div>
                    <h2>Домашнє Завдання</h2>
                    <div className="group">
                        <h3 className='predm'>Предмет</h3>
                        <h3 className='zav'>Завдання</h3>
                        <h3 className='date'>Дата створення</h3>
                        <h3 className='missed'>Дата здачі</h3>
                    </div>
                    <div className="tasks">
                        {Subjects.map((subject) => <HomeTask group={props.user.group_id} subject={subject} api={props.api} />)}
                    </div>
                </div>
            </div>
        </div>
    )

}



export default HomeTaskStudentPage;
