const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

//GET ALL THE MESSAGES
router.get('/', async (req, res) => {
    try {
        const posts = await Message.find();
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
})

//CREATE A NEW MESSAGE
router.post('/', async (req, res) => {
    var io = req.app.get('socketio');

    const message = new Message({
        name: req.body.name,
        message: req.body.message,
    });

    try {
        const savedMessage = await message.save();
        res.json(savedMessage);
        io.emit('message', message);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;