import React, { useEffect, useState} from 'react';
import { Post } from '../components'


function Homepage(props){

   const [Posts, setPosts] = useState([])

   useEffect(() => {
      props.api.get('/posts').then(res => {
         setPosts(res.data.sort(function (a,b){
            if(a.id > b.id) return -1
         }))
      })
   }, [])

   return (

       <div className='HomePage'>
          <div>
             <div className="pageContent">
                <div className="main">
                   <h1>ДРОГОБИЦЬКИЙ МЕХАНІКО-ТЕХНОЛОГІЧНИЙ ФАХОВИЙ КОЛЕДЖ</h1>
                </div>
                <div className="posts">
                   {Posts.map(post => <Post title={post.topic} text={post.text}/>)}
                </div>
             </div>
          </div>
       </div>
   );
}

export default Homepage;
