import React, {useEffect, useState} from 'react';

const StudentAbsenteeism = (props) => {

    const [Student, setStudent] = useState({fname:''})
    const [Absence, setAbsence] = useState([])

    const date = new Date()
    const [DateAbs, setDateAbs] = useState(date.toISOString().split('T')[0])

    useEffect(() => {
        props.api.get('/users/by-student-id/' + props.student.user_id).then(res => {
            setStudent(res.data[0])
        })
        props.api.get('/absenteeism/by-student/'+ props.student.user_id).then(res => {
            setAbsence(res.data)
        })
    }, []);

    function sendAbsence(){
        props.api({
            method: 'post',
            url: '/absenteeism',
            'Access-Control-Allow-Origin': true,
            data: {
                student_id: props.student.id,
                date: DateAbs,
                subject_id: props.subject_id,
                teacher_id: props.user.id
            }
        })
    }

    return (
        <div className={'flex'}>
            <div className="abs-name">
                {Student.fname}
            </div>
            <div className="abence flex">
                {console.log(Absence)}
                {Absence.map(a => a.subject_id === props.subject_id ? <div className={'abs-date'}>{a.date}</div> : <></>)}
            </div>
            <div className="add-absence">
                <input type="date" value={DateAbs} onChange={e => setDateAbs(e.target.value)}/>
                <button onClick={sendAbsence}>+</button>
            </div>
        </div>
    );
};

export default StudentAbsenteeism;
