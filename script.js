// Dados brutos das 21 respostas do formulário
const data = [
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Acreditei e Compartilhei" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Não Acompanha", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Redes Sociais", reacao: "Pesquisei no Google" },
  { canal: "Não Acompanha", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Acreditei e Compartilhei" }
];

function updateDashboard() {
  const filter = document.getElementById("channelFilter").value;
  
  let filteredData = data;
  if (filter === "social") {
    filteredData = data.filter(d => d.canal === "Redes Sociais");
  } else if (filter === "none") {
    filteredData = data.filter(d => d.canal === "Não Acompanha");
  }

  const total = filteredData.length;
  
  const countSocial = filteredData.filter(d => d.canal === "Redes Sociais").length;
  const countNone = filteredData.filter(d => d.canal === "Não Acompanha").length;

  const countIgnore = filteredData.filter(d => d.reacao === "Ignorei").length;
  const countGoogle = filteredData.filter(d => d.reacao === "Pesquisei no Google").length;
  const countShare = filteredData.filter(d => d.reacao === "Acreditei e Compartilhei").length;

  document.getElementById("cardTotal").innerText = total;
  document.getElementById("cardAcreditaram").innerText = `${countShare} (${total ? ((countShare/total)*100).toFixed(1) : 0}%)`;
  document.getElementById("cardPesquisaram").innerText = `${countGoogle} (${total ? ((countGoogle/total)*100).toFixed(1) : 0}%)`;

  // Atualiza Tabela / Gráfico 1
  const canalBody = document.getElementById("canalTableBody");
  canalBody.innerHTML = `
    <tr>
      <td>Redes Sociais / Vídeos</td>
      <td style="text-align: right;"><b>${countSocial}</b></td>
      <td style="text-align: right;">${total ? ((countSocial/total)*100).toFixed(1) : 0}%
        <div class="bar-container"><div class="bar-fill bg-blue" style="width: ${total ? (countSocial/total)*100 : 0}%"></div></div>
      </td>
    </tr>
    <tr>
      <td>Não costuma acompanhar</td>
      <td style="text-align: right;"><b>${countNone}</b></td>
      <td style="text-align: right;">${total ? ((countNone/total)*100).toFixed(1) : 0}%
        <div class="bar-container"><div class="bar-fill bg-amber" style="width: ${total ? (countNone/total)*100 : 0}%"></div></div>
      </td>
    </tr>
  `;

  // Atualiza Tabela / Gráfico 2
  const reacaoBody = document.getElementById("reacaoTableBody");
  reacaoBody.innerHTML = `
    <tr>
      <td>Ignorei</td>
      <td style="text-align: right;"><b>${countIgnore}</b></td>
      <td style="text-align: right;">${total ? ((countIgnore/total)*100).toFixed(1) : 0}%
        <div class="bar-container"><div class="bar-fill bg-amber" style="width: ${total ? (countIgnore/total)*100 : 0}%"></div></div>
      </td>
    </tr>
    <tr>
      <td>Pesquisei no Google</td>
      <td style="text-align: right;"><b>${countGoogle}</b></td>
      <td style="text-align: right;">${total ? ((countGoogle/total)*100).toFixed(1) : 0}%
        <div class="bar-container"><div class="bar-fill bg-emerald" style="width: ${total ? (countGoogle/total)*100 : 0}%"></div></div>
      </td>
    </tr>
    <tr>
      <td>Acreditei e Compartilhei</td>
      <td style="text-align: right;"><b>${countShare}</b></td>
      <td style="text-align: right;">${total ? ((countShare/total)*100).toFixed(1) : 0}%
        <div class="bar-container"><div class="bar-fill bg-rose" style="width: ${total ? (countShare/total)*100 : 0}%"></div></div>
      </td>
    </tr>
  `;
}

// Executa ao carregar a página
updateDashboard();