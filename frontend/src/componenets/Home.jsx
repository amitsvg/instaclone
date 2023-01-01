import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CardForPost from './CardForPost';
// import ppy from "../img/ppy.jpg"



export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            navigate("/signin");
        }
        // Fetching all posts
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => setData(result))
            // .then(result => console.log(result))
            .catch(err => console.log(err))

    },[])

    const likePost = (id) => {
        fetch("http://localhost:5000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then((result) => {
            const newData = data.map((cardDetails)=>{
                if(cardDetails._id == result._id){
                    return result 
                }
                else{
                    return cardDetails
                }
            })
            setData(newData);
            // console.log(result)
        })
    }

    const unlikePost = (id) => {
        fetch("http://localhost:5000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then((result) => {
            const newData = data.map((cardDetails)=>{
                if(cardDetails._id == result._id){
                    return result 
                }
                else{
                    return cardDetails
                }
            })
            setData(newData);
            // console.log(result)
        })
        
    }




    return (
        <div className='home' style={{marginTop:"10%"}}>
            {/* card */}
            {
                // data.map((posts) => {
                data.map(posts =>
                    // console.log(posts)
                    // {["Item1", "Item2", "Item3"].map(item =>
                    //     <li key="{item}">{item}</li>
                    //     )}
                    // return (
                    <CardForPost cardDetails={posts} key = {posts._id} handleLike={likePost} handleUnlike={unlikePost}  />
                )

            
            }


        </div>
    )
}