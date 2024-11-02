import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://cancer-4qfy.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.class);
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction('Prediction failed');
    }
  };

  return (
    <>
      <div className="App">
        <h1>Skin Cancer Detection</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Predict</button>
        </form>
        {prediction && <div className="prediction">Predicted class: {prediction}</div>}
      </div>
    </>
  );
}

export default App;
