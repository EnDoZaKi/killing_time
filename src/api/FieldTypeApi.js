export const FieldTypeSubmit = async (newData) => {
    try {
        const response = await fetch('http://localhost:3001/api/addObject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Failed to add object');
        }
        const result = await response.json();
        console.log('Object added successfully:', result);
        // Update UI or state as needed
    } catch (error) {
        console.error('Error adding object:', error);
    }
}

