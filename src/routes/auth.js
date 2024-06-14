const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    try{
        let user = await User.findOne({email})

        if(user) {
            return response.status(400).json({ msg: "User already exists"})
        }

        user = new User({ name, email, password})

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payLoad = { user: { id: user.id }}

        jwt.sign(payLoad, 'your_jwt_secret', {expiresIn: 360000}, (err, token) => {
            if (err) throw err
            res.json({token}) 
        } )
    } catch(err) {
        res.status(500).send("Server Error")
    }
});