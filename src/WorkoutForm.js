import React, { useState } from 'react';

const exercises = ['Laying Hamstring Curls (static machine)', 'Laying Hamstring Curls (moving machine)', 'Seated Hamstring Curls', 'Leg Press', 'Hack Squat', 'Leg Extensions', 'Standing Calf Raise', 'Laying calf raise (with back seat)', 
'preacher curls', 'seated cable curls', 'incline curls', 'overhead extensions', 'regular pushdowns', 'v-bar pushdowns', 'lat raise (machine)', 'Lat Raise (cable)', 'Lat raise (dumbbell)',
'Incline bench press (dumbbell)', 'Incline bench press (barbell)', 'incline press machine (cable based)', 'incline press machine (plates)', 'pec flies', 'seated cable rows', 'lat pulldowns', 'diag pull machine', 'rev pec dec (machine)', 'rev pec dec (dummbell)']; // Add more exercises as needed
const setNumbers = [1, 2, 3, 4, 5]; // Set numbers 1 through 5
const gyms = ['LA Fitness']

const WorkoutForm = () => {
  const [exercise, setExercise] = useState('');
  const [setNumber, setSetNumber] = useState('');
  const [reps, setReps] = useState('');
  const [gym, setGym] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [weight, setWeight] = useState('');

  const handleExerciseChange = (event) => {
    setExercise(event.target.value);
  };

  const handleSetNumberChange = (event) => {
    setSetNumber(event.target.value);
  };

  const handleRepsChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Allow only numbers
    setReps(value);
  };

  const handleGymChange = (event) => {
    setGym(event.target.value);
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      exercise: exercise,
      weight: weight,
      gym: gym,
      setNumber: parseInt(setNumber),
      reps: parseInt(reps)
    };

    try {
      const response = await fetch('https://lvf0j5thx1.execute-api.us-west-2.amazonaws.com/prod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to add entry');
      }

      setSuccessMessage('Entry added successfully');
    } catch (error) {
      setErrorMessage("Error: " + error.message)
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Exercise:
          <select value={exercise} onChange={handleExerciseChange}>
            <option value="">Select an exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Weight (in kg):
          <input type="text" value={weight} onChange={handleWeightChange} />
        </label>
        <br />
        <label>
          Set Number:
          <select value={setNumber} onChange={handleSetNumberChange}>
            <option value="">Select a set number</option>
            {setNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Reps:
          <input type="text" value={reps} onChange={handleRepsChange} />
        </label>
        <br />
        <label>
          Gym:
          <select value={exercise} onChange={handleGymChange}>
            <option value="">Select which gym</option>
            {gyms.map((gym, index) => (
              <option key={index} value={gym}>
                {gym}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
