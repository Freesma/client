import React from 'react';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AbsenteeismTeacherPage = (props) => {

    const [Groups, setGroups] = useState([])

    useEffect(() => {
        props.api.get('/groups/').then(res => {
            let gr = []
            props.user.groups.map(g => {
                gr.push(res.data.filter(data => data.id === g))
            })
            setGroups(gr)
        })

    }, []);

    return (
        <div className={'absenteesmPage'}>
            <h2>Прогули</h2>
            <div className="groups">
                {Groups.map(group =>
                    <Link to={'/AbsenteeismTeacherPage/'+group[0].id} className={'a'}>
                        <div className={'group-link'}>{group[0].name}</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default AbsenteeismTeacherPage;
