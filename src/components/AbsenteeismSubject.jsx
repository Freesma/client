import React, {useEffect} from 'react';
import {useState} from "react";
import {useParams} from "react-router-dom";
import StudentAbsenteeism from "./StudentAbsenteeism";

const AbsenteeismSubject = (props) => {

    const param = useParams()
    const [Students, setStudents] = useState([])

    useEffect(() => {
        props.api.get('/students/by-group/' + param.id).then(res =>
            setStudents(res.data)
        )
    }, []);


    return (
        <div>
            <h3>{props.subject.name}</h3>
            {Students.map(student => <StudentAbsenteeism api={props.api} subject_id={props.subject.id} student={student} user={props.user} />)}
        </div>
    );
};

export default AbsenteeismSubject;
