import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" }
  ];

  useEffect(() => {
    document.title = "ABCD123"; // Your roll number
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const jsonPayload = JSON.parse(jsonInput);
      const res = await axios.post("/api/bfhl", jsonPayload);
      setResponseData(res.data);
    } catch (error) {
      console.error("Invalid JSON or API Error", error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <h1>JSON Input</h1>
      <textarea
        rows="10"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter valid JSON"
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={handleSubmit}>Submit</button>

      {responseData && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            placeholder="Select data to display"
          />
          <div>
            {selectedOptions.map(option => (
              <div key={option.value}>
                <h3>{option.label}</h3>
                <pre>{JSON.stringify(responseData[option.value], null, 2)}</pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
