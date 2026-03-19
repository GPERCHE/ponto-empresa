const API = "https://ponto-empresa.onrender.com"; // seu backend Render

// cole aqui o token do admin depois de logar
let token = prompt("Cole o token do admin");

// CARREGAR REGISTROS
async function carregar() {
  const res = await fetch(API + "/admin/registros", {
    headers: { Authorization: token }
  });

  const dados = await res.json();

  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  dados.forEach(r => {
    tabela.innerHTML += `
      <tr>
        <td>${r.nome}</td>
        <td>${r.tipo}</td>
        <td>${new Date(r.data_hora).toLocaleString()}</td>
      </tr>
    `;
  });
}

// EXPORTAR CSV
function exportar() {
  window.open(API + "/admin/exportar");
}

// RELATÓRIO CLT
async function relatorioCLT() {
  const res = await fetch(API + "/admin/relatorio-clt", {
    headers: { Authorization: token }
  });

  const dados = await res.json();

  const resumo = document.getElementById("resumo");
  resumo.innerHTML = "";

  dados.forEach(r => {
    resumo.innerHTML += `
      <li>
        ${r.nome} - ${r.horas_trabalhadas}h (Extras: ${r.horas_extras}h)
      </li>
    `;
  });
}
