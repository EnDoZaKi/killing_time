const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '..', 'json', 'project.json');

// Helper: Read/Write
const readData = () =>
  JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
const writeData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// POST /api/add
router.post("/add", (req, res) => {
  const data = readData();
  data.push(req.body);
  writeData(data);
  res.json({ message: "Item added successfully" });
});

// GET /api/list
router.get("/list", (req, res) => {
  const data = readData();
  res.json(data);
});

// DELETE /api/delete/:id
router.delete("/delete/:id", (req, res) => {
  const data = readData();
  const filtered = data.filter((item) => item.id !== req.params.id);
  writeData(filtered);
  res.json({ message: "Item deleted" });
});

// PUT /api/update/:id
router.put("/update/:id", (req, res) => {
  const data = readData();
  const updated = data.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );
  writeData(updated);
  res.json({ message: "Item updated" });
});

module.exports = router;