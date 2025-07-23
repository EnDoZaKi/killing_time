const express = require("express");
const cors = require("cors");
// const { Pool } = require("pg");
// const admin = require("firebase-admin");
const fieldType = require('./routes/FieldTypeRouter');
const project = require('./routes/ProjectRouter');
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

// admin.initializeApp({
//   credential: admin.credential.cert(require("./firebase-admin-sdk.json")),
// });

// app.use(async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).send("Unauthorized");
//   }
// });

// // PostgreSQL config
// const pool = new Pool({
//   user: 'user',
//   host: 'localhost',
//   database: 'youtube',
//   password: 'mypassword',
//   port: 5432,
// });

// Mount router
app.use('/api/fieldtype', fieldType);
app.use('/api/project', project)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
