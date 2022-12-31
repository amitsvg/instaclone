import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import './Home.css'
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

    })


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
                    <CardForPost cardDetails={posts} key = {posts._id}   />
                )

            
            }


        </div>
    )
}