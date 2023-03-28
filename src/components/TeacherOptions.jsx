import React, {useEffect, useState} from 'react';

const TeacherOption = (props) => {

    const [Teacher, setTeacher] = useState({fname: ''});

    useEffect(() => {
        props.api.get('/users/by-student-id/'+props.id).then(res => {
            setTeacher(res.data[0])
        })
    }, []);

    return (
        <option>
            {props.id + '. ' + Teacher.lname + ' ' + Teacher.fname}
        </option>
    );
};

export default TeacherOption;
