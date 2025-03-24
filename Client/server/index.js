const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));


app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser",
    async (req, res)=>{
        try{
    const post = await UserModel.create(req.body)
    res.json(post)
}
catch(err)
{
    err => res.json(err)
}}
)

app.listen(3001, ()=>{
    console.log("Server is Running")
})