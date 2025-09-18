import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/api/posts', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/posts', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', content: '' });
      fetchPosts();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-green-700 text-xl font-bold mb-3">Foro</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Escribe tu experiencia..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Publicar</button>
      </form>

      <div>
        {posts.map(post => (
          <div key={post.id} className="mb-2 p-2 bg-green-50 rounded border">
            <strong>{post.User.name}</strong>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
