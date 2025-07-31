// src/api.js
const BASE_URL = "http://localhost:3001/api/fieldtype";

// Add item
export const addFieldType = async (item) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

// Get all items
export const getFieldTypes = async () => {
  const res = await fetch(`${BASE_URL}/list`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

// Delete item (optional: based on `id`)
export const deleteFieldType = async (id) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};

// Delete item (optional: based on `id`)
export const deleteFieldTypes = async (deletedData) => {
  const res = await fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(deletedData.data)
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};

// Update item (optional)
export const updateFieldType = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
};