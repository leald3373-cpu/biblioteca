// ==========================================
// BASE DE DADOS INICIAL AMPLIADA
// ==========================================
let livros = JSON.parse(localStorage.getItem('biblio_livros')) || [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', ano: 1899, quantidade: 4, disponiveis: 3 },
  { id: 2, titulo: '1984', autor: 'George Orwell', genero: 'Ficção Científica', ano: 1949, quantidade: 5, disponiveis: 5 },
  { id: 3, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasia', ano: 1937, quantidade: 3, disponiveis: 2 },
  { id: 4, titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', genero: 'Romance', ano: 1977, quantidade: 3, disponiveis: 3 },
  { id: 5, titulo: 'O Senhor dos Anéis: A Sociedade do Anel', autor: 'J.R.R. Tolkien', genero: 'Fantasia', ano: 1954, quantidade: 4, disponiveis: 4 },
  { id: 6, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', genero: 'Ficção Científica', ano: 1953, quantidade: 3, disponiveis: 3 },
  { id: 7, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', genero: 'Romance', ano: 1938, quantidade: 4, disponiveis: 4 },
  { id: 8, titulo: 'Ensaio sobre a Cegueira', autor: 'José Saramago', genero: 'Romance', ano: 1995, quantidade: 2, disponiveis: 1 },
  { id: 9, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', genero: 'Fantasia', ano: 1943, quantidade: 6, disponiveis: 5 },
  { id: 10, titulo: 'Capitães da Areia', autor: 'Jorge Amado', genero: 'Romance', ano: 1937, quantidade: 3, disponiveis: 3 },
  { id: 11, titulo: 'Sapiens: Uma Breve História da Humanidade', autor: 'Yuval Noah Harari', genero: 'História / Biografia', ano: 2011, quantidade: 3, disponiveis: 2 },
  { id: 12, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', genero: 'Romance', ano: 1890, quantidade: 3, disponiveis: 3 }
];

let usuarios = JSON.parse(localStorage.getItem('biblio_usuarios')) || [
  { id: 101, nome: 'Lucas Andrade', documento: '458.123.987-00', tipo: 'Estudante' },
  { id: 102, nome: 'Profa. Regina Célia', documento: 'DOC-8821', tipo: 'Professor' },
  { id: 103, nome: 'Mariana Costa', documento: '321.654.987-11', tipo: 'Estudante' },
  { id: 104, nome: 'Prof. Carlos Eduardo', documento: 'DOC-4410', tipo: 'Professor' },
  { id: 105, nome: 'Beatriz Lima', documento: '987.654.321-22', tipo: 'Comunitário' },
  { id: 106, nome: 'Gabriel Souza', documento: '159.753.486-33', tipo: 'Estudante' }
];

let emprestimos = JSON.parse(localStorage.getItem('biblio_emprestimos')) || [
  {
    id: 1001,
    livroId: 1,
    tituloLivro: 'Dom Casmurro',
    autorLivro: 'Machado de Assis',
    nomeUsuario: 'Lucas Andrade',
    dataEmprestimo: '20/09/2026',
    dataDevolucaoPrevista: '04/10/2026',
    dataDevolucaoEfetiva: '-',
    status: 'Atrasado'
  },
  {
    id: 1002,
    livroId: 3,
    tituloLivro: 'O Hobbit',
    autorLivro: 'J.R.R. Tolkien',
    nomeUsuario: 'Mariana Costa',
    dataEmprestimo: '01/10/2026',
    dataDevolucaoPrevista: '15/10/2026',
    dataDevolucaoEfetiva: '-',
    status: 'Em aberto'
  },
  {
    id: 1003,
    livroId: 11,
    tituloLivro: 'Sapiens: Uma Breve História da Humanidade',
    autorLivro: 'Yuval Noah Harari',
    nomeUsuario: 'Prof. Carlos Eduardo',
    dataEmprestimo: '02/10/2026',
    dataDevolucaoPrevista: '16/10/2026',
    dataDevolucaoEfetiva: '-',
    status: 'Em aberto'
  }
];

// Salva o estado atual no LocalStorage
function salvarStorage() {
  localStorage.setItem('biblio_livros', JSON.stringify(livros));
  localStorage.setItem('biblio_usuarios', JSON.stringify(usuarios));
  localStorage.setItem('biblio_emprestimos', JSON.stringify(emprestimos));
}

// ==========================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ==========================================
const navButtons = document.querySelectorAll('.nav-btn');
const pageViews = document.querySelectorAll('.page-view');

function irParaPagina(pageId) {
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  pageViews.forEach(page => {
    page.classList.toggle('active', page.id === `page-${pageId}`);
  });

  renderizarTudo();
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => irParaPagina(btn.dataset.page));
});

// ==========================================
// EXIBIÇÃO DE NOTIFICAÇÕES (TOAST)
// ==========================================
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  toastMessage.textContent = mensagem;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// ==========================================
// LÓGICA DE CADASTRO E RENDERIZAÇÃO
// ==========================================

// Cadastrar Livro
document.getElementById('form-livro').addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = document.getElementById('livro-titulo').value.trim();
  const autor = document.getElementById('livro-autor').value.trim();
  const genero = document.getElementById('livro-genero').value;
  const ano = document.getElementById('livro-ano').value;
  const qtd = parseInt(document.getElementById('livro-quantidade').value);

  const novoLivro = {
    id: Date.now(),
    titulo,
    autor,
    genero,
    ano,
    quantidade: qtd,
    disponiveis: qtd
  };

  livros.push(novoLivro);
  salvarStorage();
  mostrarToast('Livro cadastrado com sucesso!');
  e.target.reset();
  renderizarTudo();
});

// Cadastrar Usuário
document.getElementById('form-usuario').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('usuario-nome').value.trim();
  const documento = document.getElementById('usuario-documento').value.trim();
  const tipo = document.getElementById('usuario-tipo').value;

  const novoUsuario = {
    id: Date.now(),
    nome,
    documento,
    tipo
  };

  usuarios.push(novoUsuario);
  salvarStorage();
  mostrarToast('Leitor cadastrado com sucesso!');
  e.target.reset();
  renderizarTudo();
});

// Registrar Empréstimo
document.getElementById('form-emprestimo').addEventListener('submit', (e) => {
  e.preventDefault();
  const livroId = Number(document.getElementById('select-livro').value);
  const usuarioId = Number(document.getElementById('select-usuario').value);

  const livro = livros.find(l => l.id === livroId);
  const usuario = usuarios.find(u => u.id === usuarioId);

  if (!livro || livro.disponiveis <= 0) {
    mostrarToast('Erro: Não há exemplares disponíveis deste livro.');
    return;
  }

  // Cálculos de datas
  const hoje = new Date();
  const prazo = new Date();
  prazo.setDate(hoje.getDate() + 14);

  const novoEmprestimo = {
    id: Date.now(),
    livroId: livro.id,
    tituloLivro: livro.titulo,
    autorLivro: livro.autor,
    nomeUsuario: usuario.nome,
    dataEmprestimo: hoje.toLocaleDateString('pt-BR'),
    dataDevolucaoPrevista: prazo.toLocaleDateString('pt-BR'),
    dataDevolucaoEfetiva: '-',
    status: 'Em aberto'
  };

  // Decrementa exemplar disponível
  livro.disponiveis--;

  emprestimos.push(novoEmprestimo);
  salvarStorage();
  mostrarToast('Empréstimo registrado!');
  e.target.reset();
  renderizarTudo();
  irParaPagina('historico');
});

// Registrar Devolução
function devolverLivro(idEmprestimo) {
  const emp = emprestimos.find(e => e.id === idEmprestimo);
  if (emp && emp.status !== 'Devolvido') {
    emp.status = 'Devolvido';
    emp.dataDevolucaoEfetiva = new Date().toLocaleDateString('pt-BR');

    // Devolve exemplar ao estoque
    const livro = livros.find(l => l.id === emp.livroId);
    if (livro) livro.disponiveis++;

    salvarStorage();
    mostrarToast('Devolução registrada com sucesso!');
    renderizarTudo();
  }
}

// Renovar Empréstimo (+7 Dias)
function renovarEmprestimo(idEmprestimo) {
  const emp = emprestimos.find(e => e.id === idEmprestimo);
  if (emp && emp.status !== 'Devolvido') {
    const partes = emp.dataDevolucaoPrevista.split('/');
    const dataAtual = new Date(partes[2], partes[1] - 1, partes[0]);
    dataAtual.setDate(dataAtual.getDate() + 7);

    emp.dataDevolucaoPrevista = dataAtual.toLocaleDateString('pt-BR');
    emp.status = 'Em aberto';

    salvarStorage();
    mostrarToast('Prazo renovado por mais 7 dias!');
    renderizarTudo();
  }
}

// Exportar Tabela para CSV
function exportarCSV() {
  let csv = 'Livro;Autor;Leitor;Data Emprestimo;Prazo Devolucao;Status\n';
  emprestimos.forEach(e => {
    csv += `"${e.tituloLivro}";"${e.autorLivro}";"${e.nomeUsuario}";"${e.dataEmprestimo}";"${e.dataDevolucaoPrevista}";"${e.status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'historico_emprestimos.csv';
  a.click();
}

// ==========================================
// RENDERIZAÇÃO DINÂMICA DAS TABELAS E KPIS
// ==========================================
function renderizarTudo() {
  // 1. Atualiza KPIs do Dashboard
  document.getElementById('kpi-total-livros').textContent = livros.reduce((acc, l) => acc + l.quantidade, 0);
  document.getElementById('kpi-livros-disponiveis').textContent = livros.reduce((acc, l) => acc + l.disponiveis, 0);
  
  const ativos = emprestimos.filter(e => e.status === 'Em aberto' || e.status === 'Atrasado');
  const atrasados = emprestimos.filter(e => e.status === 'Atrasado');

  document.getElementById('kpi-emprestimos-ativos').textContent = ativos.length;
  document.getElementById('kpi-emprestimos-atrasados').textContent = atrasados.length;

  // 2. Preenche Tabela de Livros
  const tabelaLivros = document.getElementById('tabela-livros');
  tabelaLivros.innerHTML = livros.map(l => `
    <tr>
      <td><strong>${l.titulo}</strong></td>
      <td>${l.autor}</td>
      <td>${l.genero}</td>
      <td><span class="badge ${l.disponiveis > 0 ? 'badge-devolvido' : 'badge-atrasado'}">${l.disponiveis} / ${l.quantidade}</span></td>
    </tr>
  `).join('');

  // 3. Preenche Tabela de Usuários
  const tabelaUsuarios = document.getElementById('tabela-usuarios');
  tabelaUsuarios.innerHTML = usuarios.map(u => {
    const qtdAtiva = emprestimos.filter(e => e.nomeUsuario === u.nome && e.status !== 'Devolvido').length;
    return `
      <tr>
        <td><strong>${u.nome}</strong></td>
        <td>${u.documento}</td>
        <td>${u.tipo}</td>
        <td>${qtdAtiva} livro(s)</td>
      </tr>
    `;
  }).join('');

  // 4. Preenche Selects do Formulário de Empréstimo
  const selectLivro = document.getElementById('select-livro');
  const selectUsuario = document.getElementById('select-usuario');

  selectLivro.innerHTML = '<option value="">Selecione um livro livre...</option>' + 
    livros.filter(l => l.disponiveis > 0).map(l => `<option value="${l.id}">${l.titulo} (${l.disponiveis} disp.)</option>`).join('');

  selectUsuario.innerHTML = '<option value="">Selecione um leitor...</option>' + 
    usuarios.map(u => `<option value="${u.id}">${u.nome} (${u.tipo})</option>`).join('');

  // Atualiza preview da data de devolução
  const previewPrazo = new Date();
  previewPrazo.setDate(previewPrazo.getDate() + 14);
  document.getElementById('preview-data-devolucao').textContent = previewPrazo.toLocaleDateString('pt-BR');

  // 5. Preenche Tabela de Histórico
  renderizarHistorico();
}

// Filtro e Busca do Histórico
document.getElementById('input-busca').addEventListener('input', renderizarHistorico);
document.getElementById('filtro-status').addEventListener('change', renderizarHistorico);

function renderizarHistorico() {
  const busca = document.getElementById('input-busca').value.toLowerCase();
  const filtro = document.getElementById('filtro-status').value;
  const tabela = document.getElementById('tabela-historico');

  const filtrados = emprestimos.filter(e => {
    const combinaTexto = e.tituloLivro.toLowerCase().includes(busca) || 
                          e.autorLivro.toLowerCase().includes(busca) || 
                          e.nomeUsuario.toLowerCase().includes(busca);
    const combinaStatus = filtro === 'TODOS' || e.status === filtro;
    return combinaTexto && combinaStatus;
  });

  tabela.innerHTML = filtrados.map(e => {
    let badgeClass = 'badge-aberto';
    if (e.status === 'Devolvido') badgeClass = 'badge-devolvido';
    if (e.status === 'Atrasado') badgeClass = 'badge-atrasado';

    const botoesAcao = e.status !== 'Devolvido' 
      ? `<button class="btn btn-primary btn-action" onclick="devolverLivro(${e.id})">Devolver</button>
         <button class="btn btn-secondary btn-action" onclick="renovarEmprestimo(${e.id})">+7 Dias</button>`
      : `<span style="color:var(--text-muted)">Concluído (${e.dataDevolucaoEfetiva})</span>`;

    return `
      <tr>
        <td><strong>${e.tituloLivro}</strong></td>
        <td>${e.autorLivro}</td>
        <td>${e.nomeUsuario}</td>
        <td>${e.dataEmprestimo}</td>
        <td>${e.dataDevolucaoPrevista}</td>
        <td><span class="badge ${badgeClass}">${e.status}</span></td>
        <td>${botoesAcao}</td>
      </tr>
    `;
  }).join('');
}

// Inicialização Geral
renderizarTudo();