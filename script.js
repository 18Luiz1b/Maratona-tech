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

  // Atualizar cards
  document.getElementById("cardTotal").innerText = total;
  document.getElementById("cardAcreditaram").innerText = `${countShare} (${total ? ((countShare/total)*100).toFixed(1) : 0}%)`;
  document.getElementById("cardPesquisaram").innerText = `${countGoogle} (${total ? ((countGoogle/total)*100).toFixed(1) : 0}%)`;

  // Tabela 1: Canais
  const canalBody = document.getElementById("canalTableBody");
  const socialPct = total ? ((countSocial/total)*100).toFixed(1) : 0;
  const nonePct = total ? ((countNone/total)*100).toFixed(1) : 0;

  canalBody.innerHTML = `
    <tr>
      <td>📱 Redes Sociais / Vídeos</td>
      <td class="text-right">${countSocial}</td>
      <td class="text-right">
        <div class="bar-wrapper">
          <span>${socialPct}%</span>
          <div class="progress-bar"><div class="progress-fill bg-primary-fill" style="width: ${socialPct}%"></div></div>
        </div>
      </td>
    </tr>
    <tr>
      <td>🚫 Não costuma acompanhar</td>
      <td class="text-right">${countNone}</td>
      <td class="text-right">
        <div class="bar-wrapper">
          <span>${nonePct}%</span>
          <div class="progress-bar"><div class="progress-fill bg-amber-fill" style="width: ${nonePct}%"></div></div>
        </div>
      </td>
    </tr>
  `;

  // Tabela 2: Reações
  const reacaoBody = document.getElementById("reacaoTableBody");
  const ignorePct = total ? ((countIgnore/total)*100).toFixed(1) : 0;
  const googlePct = total ? ((countGoogle/total)*100).toFixed(1) : 0;
  const sharePct = total ? ((countShare/total)*100).toFixed(1) : 0;

  reacaoBody.innerHTML = `
    <tr>
      <td>🙈 Ignorei</td>
      <td class="text-right">${countIgnore}</td>
      <td class="text-right">
        <div class="bar-wrapper">
          <span>${ignorePct}%</span>
          <div class="progress-bar"><div class="progress-fill bg-amber-fill" style="width: ${ignorePct}%"></div></div>
        </div>
      </td>
    </tr>
    <tr>
      <td>🔍 Pesquisei no Google</td>
      <td class="text-right">${countGoogle}</td>
      <td class="text-right">
        <div class="bar-wrapper">
          <span>${googlePct}%</span>
          <div class="progress-bar"><div class="progress-fill bg-emerald-fill" style="width: ${googlePct}%"></div></div>
        </div>
      </td>
    </tr>
    <tr>
      <td>📢 Acreditei e Compartilhei</td>
      <td class="text-right">${countShare}</td>
      <td class="text-right">
        <div class="bar-wrapper">
          <span>${sharePct}%</span>
          <div class="progress-bar"><div class="progress-fill bg-rose-fill" style="width: ${sharePct}%"></div></div>
        </div>
      </td>
    </tr>
  `;
}

// Inicializar
updateDashboard();