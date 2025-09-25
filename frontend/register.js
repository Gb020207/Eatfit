// document.getElementById("registerForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value;
//   const age = document.getElementById("age").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const plan = document.getElementById("plan").value;

//   try {
//     const response = await fetch("http://localhost:4000/users/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, age, email, password, plan })
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert("Registro exitoso, ahora puedes iniciar sesión.");
//       window.location.href = "login.html";
//     } else {
//       alert(data.message || "Error en el registro");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Hubo un problema con el registro");
//   }
// });
