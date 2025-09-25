const API_URL = 'http://localhost:4000/api';
const token = localStorage.getItem('token');

// ----------- LOGIN -----------
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Error al iniciar sesión');
    }
  } catch (err) {
    alert('Error de conexión con el servidor');
  }
}

// ----------- REGISTRO -----------
async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Usuario registrado correctamente');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Error en el registro');
    }
  } catch (err) {
    alert('Error de conexión con el servidor');
  }
}

// ----------- TIP DEL DÍA -----------
async function loadTipOfTheDay() {
  const tipText = document.getElementById('tip-text');
  const tipCategory = document.getElementById('tip-category');
  const favBtn = document.getElementById('fav-btn');

  // validar token
  if (!token) {
    tipText.textContent = "No estás autenticado";
    tipCategory.textContent = "";
    favBtn.disabled = true;
    return;
  }

  try {
    const res = await fetch(`${API_URL}/tips/today`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // revisar que venga JSON
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Respuesta inesperada:", text);
      tipText.textContent = "Error al cargar el tip";
      tipCategory.textContent = "";
      favBtn.disabled = true;
      return;
    }

    const data = await res.json();
    if (!data.tip) {
  tipText.textContent = "No hay tips disponibles hoy";
  tipCategory.textContent = "";
  favBtn.disabled = true;
  return;
}


    if (res.ok) {
      tipText.textContent = data.tip.text;
      tipCategory.textContent = `Categoría: ${data.tip.category}`;
      favBtn.onclick = () => toggleFavorite(data.tip.id);
      favBtn.disabled = false;
    } else {
      console.error("Error del backend:", data);
      tipText.textContent = "No se pudo cargar el tip";
      tipCategory.textContent = "";
      favBtn.disabled = true;
    }

  } catch (err) {
    console.log(err);
    console.error("Error de conexión:", err);
    tipText.textContent = "Error de conexión";
    tipCategory.textContent = "";
    favBtn.disabled = true;
  }
}

// llamada inicial
loadTipOfTheDay();

// // ----------- TIP DEL DÍA -----------
// async function loadTipOfTheDay() {
//   try {
//     const res = await fetch(`${API_URL}/tips/today`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const data = await res.json();

//     const tipText = document.getElementById('tip-text');
//     const tipCategory = document.getElementById('tip-category');
//     const favBtn = document.getElementById('fav-btn');

//     if (res.ok) {
//       tipText.textContent = data.tip.text;
//       tipCategory.textContent = `Categoría: ${data.tip.category}`;
//       favBtn.onclick = () => toggleFavorite(data.tip.id);
//     } else {
//       tipText.textContent = 'No se pudo cargar el tip';
//     }
//   } catch (err) {
//     console.error(err);
//     document.getElementById('tip-text').textContent = 'Error de conexión';
//   }
// }

// // ----------- FAVORITOS -----------
// async function toggleFavorite(tipId) {
//   try {
//     const res = await fetch(`${API_URL}/tips/${tipId}/favorite`, {
//       method: 'POST',
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const data = await res.json();
//     alert(data.message);
//   } catch (err) {
//     alert('Error al actualizar favorito');
//   }
// }

// ----------- REGISTRO DIARIO -----------
async function saveDailyLog(e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const meals = document.getElementById('meals').value;
  const water = document.getElementById('water').value;
  const exercise = document.getElementById('exercise').value;
  const sleep = document.getElementById('sleep').value;

  try {
    const res = await fetch(`${API_URL}/daily-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ date, meals, water, exercise, sleep })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registro guardado correctamente');
    } else {
      alert(data.message || 'Error al guardar registro');
    }
  } catch (err) {
    console.error(err);
    alert('Error de conexión con el servidor');
  }
}
