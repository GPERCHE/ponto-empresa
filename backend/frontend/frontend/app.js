const API = "http://localhost:3000";

let token = localStorage.getItem("token");

if (token) iniciar();

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (!data.token) {
    alert("Erro no login");
    return;
  }

  token = data.token;
  localStorage.setItem("token", token);

  iniciar(data.nome);
}

function iniciar(nome = "") {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  if (nome) {
    document.getElementById("nome").innerText = "Bem-vindo, " + nome;
  }

  carregar();
}

function getLocalizacao() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve(pos.coords),
      err => {
        alert("Erro ao obter localização");
        reject(err);
      }
    );
  });
}

async function bater(tipo) {
  try {
    const loc = await getLocalizacao();

    const res = await fetch(API + "/ponto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        tipo,
        latitude: loc.latitude,
        longitude: loc.longitude
      })
    });

    const data = await res.json();

    if (data.erro) {
      alert(data.erro);
      return;
    }

    carregar();

  } catch (e) {
    console.error(e);
  }
}

async function carregar() {
  const res = await fetch(API + "/meus-registros", {
    headers: { "Authorization": token }
  });

  const dados = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `${r.tipo} - ${new Date(r.data_hora).toLocaleString()}`;
    lista.appendChild(li);
  });
}
