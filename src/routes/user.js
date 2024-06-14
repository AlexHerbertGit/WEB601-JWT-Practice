const express = require('express');
const User = require('../models/User');
const auth = require('../models/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        res.status(500).send("Server error")
    }
});

module.exports = router;