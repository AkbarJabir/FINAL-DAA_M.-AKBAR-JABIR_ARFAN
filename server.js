const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Helper function to parse time "HH:MM" to minutes from midnight
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Helper to check if two time intervals overlap
function isOverlapping(start1, end1, start2, end2) {
    return Math.max(start1, start2) < Math.min(end1, end2);
}

// API to get all courses
app.get('/api/courses', (req, res) => {
    db.all("SELECT * FROM courses", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// API to add a new course
app.post('/api/courses', (req, res) => {
    const { code, name, day, start_time, end_time, sks, semester } = req.body;
    const query = "INSERT INTO courses (code, name, day, start_time, end_time, sks, semester) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(query, [code, name, day, start_time, end_time, sks, semester], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, code, name, day, start_time, end_time, sks, semester }
        });
    });
});

// API to delete a course
app.delete('/api/courses/:id', (req, res) => {
    db.run("DELETE FROM courses WHERE id = ?", req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

// API to optimize schedule
app.post('/api/optimize', (req, res) => {
    const { maxSKS, semester } = req.body;

    let query = "SELECT * FROM courses";
    let params = [];

    if (semester) {
        query += " WHERE semester = ?";
        params.push(semester);
    }

    db.all(query, params, (err, courses) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        const validCombinations = [];
        const currentCombination = [];

        // Backtracking Algorithm
        function findCombinations(index, currentSKS) {
            // Base case: we have iterated through all courses
            // Store valid non-empty combinations
            if (currentCombination.length > 0) {
                // Push a copy of the current combination
                validCombinations.push([...currentCombination]);
            }

            // Limit results to avoid browser crash on too many combinations
            if (validCombinations.length > 500) return;

            for (let i = index; i < courses.length; i++) {
                const course = courses[i];

                // Constraint 1: Check SKS Limit
                if (currentSKS + course.sks > maxSKS) {
                    continue;
                }

                // Constraint 2: Check Time Conflict
                let hasConflict = false;
                const newStart = timeToMinutes(course.start_time);
                const newEnd = timeToMinutes(course.end_time);

                for (const scheduledCourse of currentCombination) {
                    if (scheduledCourse.day === course.day) {
                        const scheduledStart = timeToMinutes(scheduledCourse.start_time);
                        const scheduledEnd = timeToMinutes(scheduledCourse.end_time);

                        if (isOverlapping(newStart, newEnd, scheduledStart, scheduledEnd)) {
                            hasConflict = true;
                            break;
                        }
                    }
                }

                if (!hasConflict) {
                    // Choose
                    currentCombination.push(course);

                    // Explore
                    findCombinations(i + 1, currentSKS + course.sks);

                    // Un-choose (Backtrack)
                    currentCombination.pop();
                }
            }
        }

        findCombinations(0, 0);

        // Sort by total SKS descending (optional user enhancement)
        validCombinations.sort((a, b) => {
            const sksA = a.reduce((sum, c) => sum + c.sks, 0);
            const sksB = b.reduce((sum, c) => sum + c.sks, 0);
            return sksB - sksA;
        });

        res.json({
            "message": "success",
            "data": validCombinations.slice(0, 20) // Return top 20 combinations
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
