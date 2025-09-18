import { useState } from 'react';
import axios from 'axios';

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    goal: '',
    preferences: '',
    weight: '',
    height: '',
    age: ''
  });
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:4000/api/plans/generate', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan(data);
    } catch (error) {
      alert('Error al generar el plan');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-green-100 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-green-800">Cuestionario Inicial</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <select name="goal" onChange={handleChange} className="p-2 rounded">
          <option value="">Selecciona tu objetivo</option>
          <option value="bajar_peso">Bajar de peso</option>
          <option value="ganar_masa">Ganar masa muscular</option>
          <option value="mantener">Mantener peso</option>
        </select>
        <input type="text" name="preferences" placeholder="Preferencias alimenticias" onChange={handleChange} className="p-2 rounded" />
        <input type="number" name="weight" placeholder="Peso (kg)" onChange={handleChange} className="p-2 rounded" />
        <input type="number" name="height" placeholder="Altura (cm)" onChange={handleChange} className="p-2 rounded" />
        <input type="number" name="age" placeholder="Edad" onChange={handleChange} className="p-2 rounded" />
        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Generar Plan</button>
      </form>

      {plan && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{plan.title}</h3>
          <p className="text-sm mb-2">{plan.description}</p>
          {plan.meals.map((meal, index) => (
            <div key={index} className="p-2 border-b">
              <strong>{meal.name}</strong> - {meal.time}<br />
              Porción: {meal.portion}<br />
              <em>{meal.suggestions}</em>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
