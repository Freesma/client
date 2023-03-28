import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import AbsenteeismSubject from "./AbsenteeismSubject";

const AbsenteeismContainer = (props) => {
    const param = useParams()

    const [Group, setGroup] = useState({})
    const [Subjects, setSubjects] = useState([]);


    useEffect(() => {
        props.api.get('/groups/'+ param.id).then(res => {
            setGroup(res.data)
        })

        props.api.get('subjects/by-group/' + param.id).then(res => {
                setSubjects(res.data)
            }
        )
        }, []);

    function filterSubject(subjID) {
        return Subjects.filter(sub => sub.id === subjID)
    }

    return (
        <div className={'absenteeism-container'}>
            <div className="title">Прогули | {Group.name}</div>
            {(function (){
                let subject = []
                props.user.subjects.map(subj => {
                        subject.push(filterSubject(subj))
                    }
                )
                return (<div>{subject.map(sub => <div className={'subject-con'}>{sub.length >= 1 ? <AbsenteeismSubject api={props.api} subject={sub[0]} user={props.user} />:<></>}</div>)}</div>)

            }())
            }
        </div>
    );
};

export default AbsenteeismContainer;
