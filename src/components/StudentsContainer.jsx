import React, {useEffect, useState} from 'react';
import Mark from "./Mark";

const StudentsContainer = (props) => {

    const [Student, setStudent] = useState([]);
    const [Mark, setMark] = useState(2);
    const [Marks, setMarks] = useState([])

    useEffect(() => {
        props.api.get('/users/by-student-id/' + props.student.user_id).then(res => {
            setStudent(res.data[0])
        })
        props.api.get('marks/' + props.student.id).then(res => {
                setMarks(res.data.filter(filt => filt.subject_id === props.subject.id))
            }
        )
    }, [])


    function addMark(){
        let date = new Date()
        if(props.topic === '' || Mark < 2 || Mark > 5){
            alert('Введіть тему та оцінку!')
        }else{
            props.api({
                method: 'post',
                url: '/marks',
                'Access-Control-Allow-Origin': true,
                data: {
                    student_id : props.student.id,
                    teacher_id: props.user.teacher_id,
                    subject_id: props.subject.id,
                    topic: props.topic,
                    date:  date.toISOString().split('T')[0],  // 2022-06-03
                    mark: Mark
                }
            }).then(res => {
                let m = Marks
                    m.push(res.data)
                setMarks(m)
            })
        }

    }


    return (<div className={'student-con'}>
        <h4>{Student.lname + ' ' + Student.fname}</h4>
        <div className={'marks'}>
            {Marks.map(mark => <div onClick={() => {props.setStudentMark(Object.assign({}, mark, {fname: Student.fname, lname: Student.lname}))}} className='mark'>
                {mark.mark}
            </div>)}
        </div>
        <div className={'new-mark'}>
            <input type="number" max={5}  min={2} value={Mark} onChange={e => setMark(e.target.value)}/>
            <button onClick={addMark}>+</button>
        </div>
    </div>);
};

export default StudentsContainer;
