import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DailyLog() {
  const token = localStorage.getItem('token');
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    date: today,
    meals: '',
    water: '',
    exercise: '',
    sleep: ''
  });

  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get('http://localhost:4000/api/daily-logs', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLogs(res.data);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/daily-logs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Registro guardado correctamente');
      fetchLogs();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-green-100 rounded-xl shadow-lg">
      <h2 className="text-green-800 font-bold text-xl mb-3">Registro Diario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 rounded" />
        <input type="text" name="meals" placeholder="Comidas del día" value={form.meals} onChange={handleChange} className="p-2 rounded" />
        <input type="number" name="water" placeholder="Cantidad de agua (ml)" value={form.water} onChange={handleChange} className="p-2 rounded" />
        <input type="text" name="exercise" placeholder="Ejercicio realizado" value={form.exercise} onChange={handleChange} className="p-2 rounded" />
        <input type="number" name="sleep" placeholder="Horas de sueño" value={form.sleep} onChange={handleChange} className="p-2 rounded" />
        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Guardar Registro</button>
      </form>

      <h3 className="text-green-800 font-semibold mt-4">Historial</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id} className="bg-white p-2 rounded mb-2 shadow">
            <strong>{log.date}</strong> - Comidas: {log.meals}, Agua: {log.water}ml, Ejercicio: {log.exercise}, Sueño: {log.sleep}h
          </li>
        ))}
      </ul>
    </div>
  );
}
