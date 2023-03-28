import React, {useEffect} from 'react';

const GroupsOption = (props) => {
    useEffect(() => {
        props.api.get('groups')
    }, []);

    return (
        <option>

        </option>
    );
};

export default GroupsOption;
