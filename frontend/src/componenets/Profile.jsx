import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostDetail from './PostDetail'
import './Profile.css'

export default function Profile() {
    const [profileData, setProfileData] = useState([])
    const [show, setShow] = useState(false)
    const [postData, setPostData] = useState([])

    const toggleDetails = (profileDatum) => {
        if (!show) {
            setShow(true)
            setPostData(profileDatum);
        }
        else {
            setShow(false)
        }
        // show = setShow(!current);
        console.log(profileDatum)
    }


    useEffect(() => {
        fetch("http://localhost:5000/myposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                setProfileData(result)
                console.log(result)
            })
            
        },[])
        
        // setFol(profileData[0].postedBy.followers)
        // console.log(fol);

    return (
        <div className='profile'>
            {/* Profile frame */}
            <div className="profile-frame">
                {/* Profile Data */}
                <div className="profile-pic">
                    <img src="data:image/jpeg;base64,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" alt="profile-img" />
                </div>
                {/* Profile Data */}
                <div className="profile-data">
                    <div>
                        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                        <Link to="/myfollowingpost">
                            <button>My Followings</button>
                        </Link>

                    </div>
                    <div className="profile-info">
                        <p>{profileData.length} posts</p>
                        <p>{profileData[0] ? profileData[0].postedBy.followers.length : "0"} following</p>
                        <p>{profileData[0] ? profileData[0].postedBy.following.length : "0"} following</p>
                    </div>

                </div>

            </div>
            <hr style={{ width: "90%", margin: "25px auto", opacity: "0,8" }} />

            {/* Gallery */}
            <div className="gallery">
                {
                    profileData.map(profileDatum =>
                        <img key={profileDatum._id} className='item' src={profileDatum.photo} alt="profileDatum" onClick={() => { toggleDetails(profileDatum) }} />
                        // <img key={profileDatum._id} className='item' src={profileDatum.photo} alt="profileDatum" onClick={toggleDetails} />
                    )
                }
            </div>
            {
                show && <PostDetail post={postData} toggleDetails={toggleDetails} />
            }



        </div>

    )
}