import { useState } from 'react';
import './App.css';
import { calculateMinCars } from './functions/calculateMinCars';
import vehicleLogo from './assets/AllocateVehicleLogo.jpg';

function App() {
  const [peopleInput, setPeopleInput] = useState('');
  const [seatsInput, setSeatsInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const validateInput = (input: string, fieldName: string): number[] | null => {
    // Check if input is empty
    if (input.trim() === '') {
      setError(`${fieldName} cannot be empty.`);
      return null;
    }

    // Check if input contains comma
    if (!input.includes(',')) {
      setError(
        `${fieldName} must contain at least one comma. Example: 1,4,1 or 5,3`
      );
      return null;
    }

    // Split by comma
    const parts = input.split(',');

    // Check if there's at least 1 number
    if (parts.length < 1) {
      setError(`${fieldName} must have at least one number.`);
      return null;
    }

    // Try to convert each part to a number
    const numbers: number[] = [];
    for (let i = 0; i < parts.length; i++) {
      const trimmed = parts[i].trim();

      // Check if part is empty (e.g., "1,,4")
      if (trimmed === '') {
        setError(
          `${fieldName} has empty value at position ${i + 1}. Remove extra commas.`
        );
        return null;
      }

      const num = parseInt(trimmed);

      // Check if conversion failed
      if (isNaN(num)) {
        setError(
          `${fieldName} contains invalid number: "${trimmed}" at position ${
            i + 1
          }. Only numbers are allowed.`
        );
        return null;
      }

      // Check if number is negative
      if (num < 0) {
        setError(
          `${fieldName} cannot contain negative numbers. Found: ${num} at position ${
            i + 1
          }`
        );
        return null;
      }

      numbers.push(num);
    }

    return numbers;
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    // Validate people input
    const P = validateInput(peopleInput, 'People per car');
    if (P === null) return;

    // Validate seats input
    const S = validateInput(seatsInput, 'Available seats per car');
    if (S === null) return;

    // Check if both arrays have the same length
    if (P.length !== S.length) {
      setError(
        `Both inputs must have the same number of values. People has ${P.length}, but seats has ${S.length}.`
      );
      return;
    }

    // Calculate and set result
    try {
      const minCars = calculateMinCars(P, S);
      setResult(minCars);
    } catch (err) {
      setError('An error occurred during calculation. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="card">
        <img src={vehicleLogo} alt="Vehicle Allocator Logo" className="logo" />
        <h1>Vehicle Allocator</h1>
        <p className="subtitle">
          Calculate the minimum number of cars needed to carry all the people.
        </p>

        <div className="field">
          <label>People per car</label>
          <input
            value={peopleInput}
            onChange={(e) => setPeopleInput(e.target.value)}
            placeholder="e.g. 1, 4, 1"
          />
          <small>Enter numbers separated by commas (e.g., 1,4,1)</small>
        </div>

        <div className="field">
          <label>Available seats per car</label>
          <input
            value={seatsInput}
            onChange={(e) => setSeatsInput(e.target.value)}
            placeholder="e.g. 1, 5, 1"
          />
          <small>Enter numbers separated by commas (e.g., 1,5,1)</small>
        </div>

        {error && <div className="error">⚠️ {error}</div>}

        <button onClick={handleCalculate}>Calculate Minimum Cars</button>

        {result !== null && (
          <div className="result">
            <span>Minimum Cars Needed</span>
            <strong>{result}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;