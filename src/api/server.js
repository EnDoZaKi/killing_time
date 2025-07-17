    // Example in Node.js with Express
    const express = require('express');
    const fs = require('fs');
    const app = express();
    app.use(express.json());

    app.post('/api/addObject', (req, res) => {
        const newObject = req.body;

        fs.readFile('../json/variable.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }

            let jsonData = [];
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                console.warn('Existing data.json is empty or invalid, initializing as empty array.');
                jsonData = []; // Handle empty or invalid JSON gracefully
            }

            jsonData.push(newObject);

            fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    return res.status(500).send('Error writing file');
                }
                res.status(200).json({ message: 'Object added successfully', newObject });
            });
        });
    });

    app.listen(3001, () => {
        console.log('Server listening on port 3001');
    });