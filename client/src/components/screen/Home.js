import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import {userContext} from '../../App'

export default function Home() {


        const [data,setData] = useState([])
        const {state,dispatch} = useContext(userContext)
        




        useEffect(()=>{
                fetch('http://localhost:5000/allpost',{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result.posts)
                    setData(result.posts)
                })
             },[])



             const makeComment = (text,postId)=>{
                fetch('http://localhost:5000/comment',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        postId,
                        text
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    const newData = data.map(item=>{
                      if(item._id==result._id){
                          return result
                      }else{
                          return item
                      }
                   })
                  setData(newData)
                }).catch(err=>{
                    console.log(err)
                })
          }
      



        return (
       <div>
       <div className = "home">
{
data.map(items=>{

        return(




                <div className="card home-card">  
        <h8> Posted by : {items.postedBy.name}</h8>

        <div className="card-image">
                <img src={items.photo}></img>
           </div>

<div className="card-content">
<h6> Title:  {items.title}</h6>
<p>       {items.body}</p>


{   items.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
<form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,items._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                               


</div>
</div>
        )
})

}
        </div>
</div>   
 
 )}
