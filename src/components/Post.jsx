import React, { Component } from 'react';

class Post extends Component {
   render() {
      return (
         <div className='post'>
            <h3>{this.props.title}</h3>
               <p>{this.props.text}</p>
         </div>
      );
   }
}

export default Post;
