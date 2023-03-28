import React, {useEffect, useState} from 'react';
import Link from 'react-scroll/modules/components/Link';
import axios from "axios";

const api = axios.create({
   baseURL: 'http://localhost:5000'
})


function TimetableStudentPage(){

   const [Groups, setGroups] = useState([])
   const [TimeTable, setTimeTable] = useState([])
   const courses = [1, 2, 3, 4]
   const days = [
      {name: 'Понеділок', no: 1},
      {name: 'Вівторок', no: 2},
      {name: 'Середа', no: 3},
      {name: 'Четвер', no: 4},
      {name: "П'ятниця", no: 5}
   ]


   useEffect(() => {
      api.get('/groups').then(res => {
         setGroups(res.data.sort((a, b) => {
            return a.course - b.course
         }))
      })
      api.get('/time-table').then(res => {
         setTimeTable(res.data)
      })

   }, [])


   // Get lessons for group by day and sort them
   function getLessons(group_id, day){
      let table = TimeTable.filter(timetable => timetable.id_group === group_id && timetable.day === day)
      table.sort((a, b) => {
         return a.no_lesson - b.no_lesson
      })
      return table
   }

   return(
       <div className='dayTimeTable_page'>
          <div>
          <h2 id='Top'>Розклад</h2>
          <Link to='Top' smooth={true}><i className='bx bx-chevron-up up'></i></Link>
          <div className='scroll-menu'>
             {Groups.map((group) => <Link className='scroll-menu-link' to={group.name}
                                          smooth={true}
                                          duration={1000} >{group.name}</Link>)}
          </div>
          <div className="table_container">
             {courses.map((course) => <>
                <h3>{course} КУРС</h3>
                {Groups.map((group) => {
                   if(group.course === course){
                      return(<div>
                         <h4 className='group' id={group.name}>{group.name}</h4>
                          <div className="days">
                              {days.map((day) => {
                                  return (
                                      <div className={'day'}>
                                          <h4 className={'day-name'}>{day.name}</h4>
                                          <div>
                                             { getLessons(group.id, day.no).map((lesson) => <p>{lesson.no_lesson + '. ' + lesson.name}</p>)}
                                          </div>
                                      </div>
                                  )
                              })}
                          </div>


                      </div>)
                   }
                })}
             </>)}
                  </div>
               </div>
         </div>
   )
}

export default TimetableStudentPage;

