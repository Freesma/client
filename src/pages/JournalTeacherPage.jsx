import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const JournalTeacherPage = (props) => {

    const [Groups, setGroups] = useState([]);

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
        <div>
            <div className='ZhurnalPage'>
                <h2>Журнал</h2>
                <div className="groups">
                    {Groups.map(group =>
                        <Link to={'/JournalTeacherPage/'+group[0].id} className={'a'}>
                            <div className={'group-link'}>{group[0].name}</div>
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default JournalTeacherPage;
