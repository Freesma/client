   import React, { Component } from 'react';

   class Mark extends Component {
      render(...props) {
         return (
            <div className='mark'>
               {this.props.mark}
            </div>
         );
      }
   }

   export default Mark;
