import React, {useEffect, useState} from 'react';
import SubjectContainer from "./SubjectContainer";
import {useParams} from "react-router-dom";

const GroupContainer = (props) => {

    const param = useParams()

    const [Subjects, setSubjects] = useState([]);
    const [Group, setGroup] = useState({})


    useEffect(() => {

        props.api.get('/groups/'+param.id).then(res => {
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
        <div className='block-container'>
            <div className="block-title">Журнал | {Group.name}</div>
            <div className={'block-content active'}>
                {(function (){
                    let subject = []
                    props.user.subjects.map(subj => {
                            subject.push(filterSubject(subj))
                        }
                    )
                    return (<div>{subject.map(sub => <div className={'subject-con'}>{sub.length >= 1 ? <SubjectContainer api={props.api} group={Group} user={props.user} subject={sub[0]}/>:<></>}</div>)}</div>)
                }())
                }
            </div>
        </div>
    );
};

export default GroupContainer;
