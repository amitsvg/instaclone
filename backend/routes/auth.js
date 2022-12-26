const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send("hello")
})

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;
    if(!name ||!email || !userName || !password){
        return res.status(422).json({error: "Please fill all the fields", warnkaro: " ओ .. अच्छे से फॉर्म भर !!"})
    }
    USER.findOne({$or:[{email:email},{userName:userName}] }).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({Error: "USer arlready exist with this email or username"})
        }
        bcrypt.hash(password, 10).then((hashedPassword) =>{

            const user = new USER({
                name,
                email,
                userName,
                password:hashedPassword
            })
        
            user.save(user)
            .then(user => {res.json({message: "Registered successfully"})})
            .catch(err => {console.log(err)})
            
        })
        
     })

})

router.post("/signin",(req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please fill email and password" })
    }

    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password, savedUser.password)
        .then((match)=>{
            if(match){
                return res.status(200).json({message:"Signed in Successfully"})
            }else{
                return res.status(422).json({error: "Invalid Password"})
            }
        })
        .catch(err => console.log(err))
    }) 
})


module.exports = router;