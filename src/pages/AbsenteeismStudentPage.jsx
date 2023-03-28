import React, {useEffect, useState} from 'react';
import {Absence} from "../components";


function AbsenteeismStudentPage(props){

   const [Absenteeisms, setAbsenteeisms] = useState([])
    const [Subjects, setSubjects] = useState([])

    useEffect(() => {
        props.api.get('/absenteeism/by-student/'+props.user.student_id).then(res =>{
            setAbsenteeisms(res.data)
        })

        props.api.get('/subjects/by-group/'+ props.user.group_id).then(res => {
            setSubjects(res.data)
        })
    }, []);


   return (
       <div>
          <div className='absenteesmPage'>
             <h2>Пропуски</h2>
             <div className="group">
                <h3 className='predm'>Предмет</h3>
                <h3 className='missed'>Пропуски</h3>
             </div>
             <div className="absence">
                 {Subjects.map(subject => {
                     const absen = Absenteeisms.filter(abs => abs.subject_id === subject.id)
                     return(
                         <Absence predm={subject.name} abs={absen} />
                         )
                 })}
             </div>

          </div>
       </div>
   );

}
export default AbsenteeismStudentPage;
