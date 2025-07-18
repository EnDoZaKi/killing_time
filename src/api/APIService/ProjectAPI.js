// src/api.js
const BASE_URL = "http://localhost:3001/api/project";

// Add item
export const addProject = async (item) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
};

// Get all items
export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/list`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

// Delete item (optional: based on `id`)
export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};

// Update item (optional)
export const updateProject = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
};