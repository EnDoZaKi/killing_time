const express = require("express");
const cors = require("cors");
// const { Pool } = require("pg");
// const admin = require("firebase-admin");
const fieldtype = require('./routes/FieldTypeRouter');
const project = require('./routes/ProjectRouter');
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Mount router
app.use('/api/fieldtype', fieldtype);
app.use('/api/project', project);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
