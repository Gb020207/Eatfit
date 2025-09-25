const API_URL = "http://localhost:4000/api/comments";

const form = document.getElementById("comment-form");
const commentsContainer = document.getElementById("comments-container");

// Cargar comentarios existentes
async function loadComments() {
  try {
    const res = await fetch(API_URL);
    const comments = await res.json();

    commentsContainer.innerHTML = "";
    comments.forEach(c => {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `<strong>${c.userName}</strong><p>${c.text}</p><small>${new Date(c.createdAt).toLocaleString()}</small>`;
      commentsContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Error al cargar comentarios:", err);
  }
}

// Enviar un comentario nuevo
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = document.getElementById("userName").value.trim();
  const text = document.getElementById("commentText").value.trim();

  if (!userName || !text) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, text })
    });

    if (res.ok) {
      document.getElementById("userName").value = "";
      document.getElementById("commentText").value = "";
      loadComments(); // recargar comentarios
    } else {
      alert("Error al enviar comentario");
    }
  } catch (err) {
    console.error("Error al enviar comentario:", err);
  }
});

// Cargar comentarios al inicio
loadComments();
