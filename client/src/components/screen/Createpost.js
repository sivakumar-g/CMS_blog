import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export default function CreatePost() {
  const history = useHistory()
    
  
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  
  


  useEffect(()=>{
    if(url){
     fetch("http://localhost:5000/createpost",{
         method:"post",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
             title,
             body,
             pic:url
         })
     }).then(res=>res.json())
     .then(data=>{
 
        if(data.error){
           M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
            history.push('/')
        }
     }).catch(err=>{
         console.log(err)
     })
 }
 },[url])



  const postDetails = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","cms_upload")
    data.append("cloud_name","dmeqaqfda")
    axios.post("https://api.cloudinary.com/v1_1/dmeqaqfda/image/upload",data)
    .then(data=>{
       setUrl(data.data.url)
       console.log(data);

       console.log(data.data.url);

       
    })
    .catch(err=>{
        console.log(err)
    })







    









    

  }

  
  
  return (
        <div className="card input-filed"
        
        style={{

margin : "10px auto",
maxWidth : "1000px",
padding:"20px",
textalign :"center" 

}}>

<input type="text" placeholder="Title"
 value={title}
            onChange={(e)=>setTitle(e.target.value)}
            

/>
<input type="text"

placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
          


/>
<form >
    <div class="file-field input-field">
      <div class="btn">
        <span>Upload</span>
        <input type="file"
onChange={(e)=>setImage(e.target.files[0])} 
        />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" />
      </div>
    </div>
   

  </form>
  <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
   onClick={()=>postDetails()}
   >
               Submit
            </button>

        </div>
    )
}
