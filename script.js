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

let pieChartInstance = null;
let barChartInstance = null;

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

  // 1. Renderizar / Atualizar Gráfico de Pizza
  const ctxPie = document.getElementById('pieChart').getContext('2d');
  if (pieChartInstance) pieChartInstance.destroy();

  pieChartInstance = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Redes Sociais / Vídeos', 'Não acompanha notícias'],
      datasets: [{
        data: [countSocial, countNone],
        backgroundColor: ['#4f46e5', '#f59e0b'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // 2. Renderizar / Atualizar Gráfico de Barras
  const ctxBar = document.getElementById('barChart').getContext('2d');
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Ignorei', 'Pesquisei no Google', 'Acreditei e Compartilhei'],
      datasets: [{
        label: 'Quantidade de Alunos',
        data: [countIgnore, countGoogle, countShare],
        backgroundColor: ['#f59e0b', '#10b981', '#f43f5e'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });
}

// Inicializar na carga
updateDashboard();