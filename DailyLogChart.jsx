import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyLogChart({ logs }) {
  // Convertimos los logs en datos numéricos para el gráfico
  const data = logs.map(log => ({
    date: log.date,
    agua: log.water,
    sueño: log.sleep,
    ejercicio: log.exercise.length // simplificación: longitud de texto
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="agua" fill="#34D399" />
        <Bar dataKey="sueño" fill="#10B981" />
        <Bar dataKey="ejercicio" fill="#047857" />
      </BarChart>
    </ResponsiveContainer>
  );
}
