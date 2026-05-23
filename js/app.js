const produtos = [
    { id: 1, nome: "vassoura", categoria: "limpeza", preco: 20.00 },
    { id: 2, nome: "lixeira", categoria: "organizacao", preco: 10.00 },
    { id: 3, nome: "aspirador de pó", categoria: "eletro", preco: 35.00 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho_diop')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-produtos')) {
        renderizarProdutos(produtos);
        configurarEventosProdutos();
    }
    
    if (document.getElementById('form-pedido')) {
        configurarEventosFormulario();
    }

    atualizarContadorVisual();
});

function renderizarProdutos(listaParaExibir) {
    const container = document.getElementById('lista-produtos');
    if (!container) return;

    container.innerHTML = '';

    if (listaParaExibir.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1;">Nenhum produto encontrado com esses filtros.</p>';
        return;
    }

    listaParaExibir.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        Object.assign(card.style, {
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        });

        card.innerHTML = `
            <h3 style="font-size: 18px; margin: 10px 0;">${produto.nome}</h3>
            <p style="color: #666; font-size: 14px; text-transform: uppercase;">${produto.categoria}</p>
            <p style="font-weight: bold; color: #2ecc71; margin: 10px 0;">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="btn-comprar" data-id="${produto.id}" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; width: 100%;">Adicionar ao Carrinho</button>
        `;

        card.querySelector('.btn-comprar').addEventListener('click', () => adicionarAoCarrinho(produto.id));
        container.appendChild(card);
    });
}

function configurarEventosProdutos() {
    document.getElementById('filtro-categoria').addEventListener('change', filtrarEOrdenar);
    document.getElementById('ordenacao').addEventListener('change', filtrarEOrdenar);
}

function filtrarEOrdenar() {
    const categoria = document.getElementById('filtro-categoria').value;
    const ordem = document.getElementById('ordenacao').value;

    let resultado = produtos;
    if (categoria !== 'todos') {
        resultado = produtos.filter(p => p.categoria === categoria);
    }

    let resultadoOrdenado = [...resultado];
    if (ordem === 'preco-crescente') {
        resultadoOrdenado.sort((a, b) => a.preco - b.preco);
    } else if (ordem === 'preco-decrescente') {
        resultadoOrdenado.sort((a, b) => b.preco - a.preco);
    }

    renderizarProdutos(resultadoOrdenado);
}

function adicionarAoCarrinho(id) {
    const produtoSelecionado = produtos.find(p => p.id === id);
    if (!produtoSelecionado) return;

    carrinho.push(produtoSelecionado);
    localStorage.setItem('carrinho_diop', JSON.stringify(carrinho));
    
    atualizarContadorVisual();
    exibirFeedbackPopup(`"${produtoSelecionado.nome}" adicionado com sucesso!`, 'sucesso');
}

function atualizarContadorVisual() {
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

function configurarEventosFormulario() {
    const form = document.getElementById('form-pedido');
    const inputTelefone = document.getElementById('telefone');

    inputTelefone.addEventListener('input', (e) => {
        let num = e.target.value.replace(/\D/g, "");
        if (num.length > 0) num = `(${num}`;
        if (num.length > 3) num = `${num.slice(0, 3)}) ${num.slice(3)}`;
        if (num.length > 9) num = `${num.slice(0, 9)}-${num.slice(9, 13)}`;
        e.target.value = num.slice(0, 15);
    });

    form.addEventListener('submit', (evento) => {
        let formValido = true;
        const nome = document.getElementById('nome');
        const telefone = document.getElementById('telefone');

        document.getElementById('erro-nome').textContent = "";
        document.getElementById('erro-telefone').textContent = "";

        if (nome.value.trim().split(" ").length < 2) {
            document.getElementById('erro-nome').textContent = "Por favor, digite seu nome e sobrenome.";
            formValido = false;
        }

        const regexTelefone = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if (!regexTelefone.test(telefone.value)) {
            document.getElementById('erro-telefone').textContent = "Insira um telefone válido no formato (99) 99999-9999.";
            formValido = false;
        }

        if (!formValido) {
            evento.preventDefault();
        } else {
            evento.preventDefault();
            exibirFeedbackPopup("Pedido enviado com sucesso!", "sucesso");
            form.reset();
            carrinho = [];
            localStorage.removeItem('carrinho_diop');
            atualizarContadorVisual();
        }
    });
}

function exibirFeedbackPopup(mensagem, tipo) {
    const popupExistente = document.querySelector('.popup-diop');
    if (popupExistente) popupExistente.remove();

    const popup = document.createElement('div');
    popup.className = 'popup-diop';
    popup.textContent = message || mensagem;

    Object.assign(popup.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        padding: '15px 25px',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor: tipo === 'sucesso' ? '#2ecc71' : '#e74c3c',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '2000',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        transition: 'opacity 0.4s ease'
    });

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 400);
    }, 3500);
}
