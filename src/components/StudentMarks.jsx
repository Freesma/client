import React, {Component, useEffect, useState} from 'react';
import { Mark } from './'
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/'
})


export default function Studentmarks(props){

    const [Marks, setMarks] = useState([])

    useEffect(() => {
        api.get('/marks/'+props.student).then(res => {
            setMarks(res.data)
        })
    }, [])
    var serMark=0, counter=0
    return(
        <div className='studentMark'>
            <p className="subject">{props.subject.name}</p>
            <div className="markBlock">
                {Marks.map((m) => {if(m.subject_id === props.subject.id){
                    serMark = serMark + m.mark;
                    counter+=1
                    return <Mark mark={m.mark} />}})}
            </div>
            {Math.round(serMark/counter) === 2 ? <div className="serMark redMark">2</div> :
                (Math.round(serMark/counter) ===3 ? <div className="serMark orangeMark">3</div> :
                    (Math.round(serMark/counter) ===4 ? <div className="serMark yellowMark">4</div> :
                        (Math.round(serMark/counter) ===5 ? <div className="serMark greenMark">5</div> : (<div></div>)))) }
        </div>
    )
}
