const express = require('express');
const cors = require('cors');
const fieldType = require('./routes/FieldTypeRouter');
const project = require('./routes/ProjectRouter');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount router
app.use('/api/fieldtype', fieldType);
app.use('/api/project', project)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
