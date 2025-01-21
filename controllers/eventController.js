const db = require('../config/db');

exports.getEvents = (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.createEvent = (req, res) => {
    const { title, description, date, location } = req.body;
    const query = 'INSERT INTO events (title, description, date, location, created_by) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, date, location, req.user.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Event berhasil dibuat' });
    });
};

exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;
    const query = 'DELETE FROM events WHERE id = ?';
    db.query(query, [eventId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    });
};
