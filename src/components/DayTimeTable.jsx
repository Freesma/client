import React, { Component } from 'react';

class Daytimetable extends Component {
   render(...props) {
      return (
         <div className='dayTimeTable'>
            {this.props.lessons.map((lesson) => <p className='lesson'>{lesson}</p>)}
         </div>
      );
   }
}

export default Daytimetable;
