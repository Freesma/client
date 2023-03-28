import React, { Component } from 'react';
import { DayTimeTable } from '../components'

class Grouptimetable extends Component {
   render(...props) {
      return (
         <div className='groups'>

            {this.props.groups.map((group) => <div className='group'>
               <h4 className='group' id={group[0]}>{group[0]}</h4>
               <div className="days">
               {group[1].map((gr) => <div className='day'>
                  <h4>{gr[0]}</h4>
                  <DayTimeTable lessons={gr[1]} />
               </div>)}
               </div> 
            </div>)}
         </div>
      );
   }
}

export default Grouptimetable;
