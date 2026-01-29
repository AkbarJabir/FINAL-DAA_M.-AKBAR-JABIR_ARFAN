const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./schedule.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT,
            name TEXT,
            day TEXT,
            start_time TEXT,
            end_time TEXT,
            sks INTEGER,
            semester INTEGER
        )`, (err) => {
            if (err) {
                console.log('Table creation error: ', err);
            }
        });
    }
});

module.exports = db;
