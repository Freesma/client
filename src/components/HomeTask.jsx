import React, {useEffect, useState} from 'react';

const MyComponent = (props) => {

    const [HomeTasks, setHomeTasks] = useState({});

    useEffect(() => {
        props.api.get('home-tasks/byGroupID-bySubjectID/' + props.group + '-' + props.subject.id).then(res => {
            setHomeTasks(res.data)
        })
    }, []);


    return (
        <div className='task'>
            <p className='predm'>{props.subject.name}</p>
            <p className='zav'>{HomeTasks.name}</p>
            <p className='date'>{HomeTasks.start_date}</p>
            <p className='missed'>{HomeTasks.end_date}</p>
        </div>
    );
};

export default MyComponent;
