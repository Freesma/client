import React, {useEffect, useState} from 'react';
import { StudentMarks } from '../components'


export default function JournalStudentPage(props){
    const [Subjects, setSubjects] = useState([])
    const [Group, setGroup] = useState('')
    useEffect(() => {
        props.api.get('/subjects/by-group/'+props.user.group_id).then(res => {
            setSubjects(res.data)
        })
    }, [])

    useEffect(() =>{
        props.api.get('/groups/' + props.user.group_id).then(res => {
            setGroup(res.data.name)
        })
    }, [])

    return(
        <div className='ZhurnalPage'>
            <div>
                <h2>Журнал</h2>
                <div className="user">
                    <p className="role">{props.user.roles[0]}</p>
                    <p className='name'>{props.user.lname} {props.user.fname}</p>
                    <p className='group'>Група {Group}</p>
                </div>
                <div className="marksBlock">
                    {Subjects.map((subject) => <StudentMarks subject={subject} student={props.user.student_id} />)}

                </div>
            </div>
        </div>
    )
}


