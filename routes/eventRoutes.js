const express = require('express');
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventController');
const authenticateToken = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    console.log('GET /api/event route accessed'); 
    getEvents(req, res);
});
router.get('/', authenticateToken, getEvents);
router.post('/', authenticateToken, createEvent);


router.delete('/:id', authenticateToken, deleteEvent);

module.exports = router;
