const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'json.db');

const initializeDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));
    console.log('json.db created with initial empty object.');
  }
};

initializeDb();

// app.post('/api/state', (req, res) => {
//   const state = req.body;
//   fs.writeFile(dbPath, JSON.stringify(state, null, 2), (err) => {
//     if (err) {
//       console.error('Error writing to json.db:', err);
//       return res.status(500).send('Error updating state.');
//     }
//     res.send('State updated successfully.');
//   });
// });
app.post('/api/state', (req, res) => {
    const state = req.body;
    fs.writeFile(dbPath, JSON.stringify(state, null, 2), (err) => {
      if (err) {
        console.error('Error writing to json.db:', err);
        return res.status(500).json({ error: 'Error updating state.' });
      }
      console.log('State updated successfully.');
      // Send a valid JSON response
      res.status(200).json({ message: 'State updated successfully.' });
    });
  });
  
//     const state = req.body;
//     fs.writeFile(dbPath, JSON.stringify(state, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing to json.db:', err);
//         return res.status(500).json({ error: 'Error updating state.' });
//       }
//       res.status(200).json({ message: 'State updated successfully.' });  
//     });
//   });
  

app.get('/api/state', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading json.db:', err);
      return res.status(500).send('Error reading state.');
    }
    try {
      if (!data) {
        return res.json({});
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON from json.db:', parseError);
      return res.status(500).send('Error parsing state data.');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
