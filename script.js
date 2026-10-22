// Dados reais retirados da pesquisa
const data = [
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Acreditaram e Compartilharam" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Não Acompanha", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Redes Sociais", reacao: "Ficaram na dúvida e Pesquisaram" },
  { canal: "Não Acompanha", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Ignorei" },
  { canal: "Redes Sociais", reacao: "Acreditaram e Compartilharam" }
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

  // Contagem para o Gráfico 1 (Pizza)
  const countSocial = filteredData.filter(d => d.canal === "Redes Sociais").length;
  const countNone = filteredData.filter(d => d.canal === "Não Acompanha").length;

  // Contagem para o Gráfico 2 (Barras)
  const countShare = filteredData.filter(d => d.reacao === "Acreditaram e Compartilharam").length;
  const countSearch = filteredData.filter(d => d.reacao === "Ficaram na dúvida e Pesquisaram").length;
  const countIgnore = filteredData.filter(d => d.reacao === "Ignorei").length;

  // Renderizar / Atualizar Gráfico 1 (Pizza)
  const ctxPie = document.getElementById('pieChart').getContext('2d');
  if (pieChartInstance) pieChartInstance.destroy();

  pieChartInstance = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Redes Sociais', 'Portais de Notícias', 'TV', 'Outros'],
      datasets: [{
        data: [countSocial, 0, 0, countNone], // Adaptado para as opções da imagem
        backgroundColor: ['#2563eb', '#38bdf8', '#8b5cf6', '#eab308']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { font: { family: 'Nunito', size: 12, weight: '700' } }
        }
      }
    }
  });

  // Renderizar / Atualizar Gráfico 2 (Barras)
  const ctxBar = document.getElementById('barChart').getContext('2d');
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Acreditaram e Compartilharam', 'Ficaram na dúvida e Pesquisaram', 'Ignorei'],
      datasets: [{
        data: [countShare, countSearch, countIgnore],
        backgroundColor: ['#7c3aed', '#5eead4', '#cbd5e1'],
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
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// Inicializa o Dashboard
updateDashboard();