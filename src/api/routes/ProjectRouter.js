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
  const { name, variable } = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ message: 'Read error' });
    }

    let jsonData = JSON.parse(data);

    // 🔢 Get max existing ID and increment
    const maxId = jsonData.reduce((max, item) => Math.max(max, item.id || 0), 0);
    const newItem = {
      id: maxId + 1,
      name,
      variable
    };

    jsonData.push(newItem);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Write error:", err); // 👈 THIS LINE
        return res.status(500).json({ message: 'Write error' });
      }

      console.log("Item saved:", newItem); // For checking
      res.status(201).json({ message: 'Item added successfully', item: newItem });
    });
  });
});

// GET /api/list
router.get("/list", (req, res) => {
  const data = readData();
  res.json(data);
});

// DELETE /api/delete/:id
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const filtered = data.filter((item) => item.id !== id);
  console.log(filtered);

  writeData(filtered);
  res.json({ message: "Item deleted" });
});

// PUT /api/update/:id
router.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, variable } = req.body;

  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { id, name, variable };
  }

  writeData(data);
  res.json({ message: "Item updated" });
});

module.exports = router;