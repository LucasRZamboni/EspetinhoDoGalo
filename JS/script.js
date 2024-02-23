// Inicializar um objeto para armazenar as quantidades de cada card
const quantidades = {};

function aumentarQuantidade(cardId) {
    if (!quantidades[cardId]) {
        quantidades[cardId] = 0;
    }
    quantidades[cardId]++;
    atualizarQuantidade(cardId);
}

function diminuirQuantidade(cardId) {
    if (quantidades[cardId] > 0) {
        quantidades[cardId]--;
        atualizarQuantidade(cardId);
    }
}

function adicionarAoPedido(cardId) {
    // Adicione aqui a lógica para adicionar a quantidade escolhida ao pedido do card específico
    alert(`Adicionar ${quantidades[cardId]} ao pedido do ${cardId}`);
    // Reinicializa a quantidade após adicionar ao pedido
    quantidades[cardId] = 0;
    atualizarQuantidade(cardId);
}

function atualizarQuantidade(cardId) {
    const elementoQuantidade = document.querySelector(`#${cardId} .quantidade`);
    if (elementoQuantidade) {
        elementoQuantidade.textContent = quantidades[cardId].toString();
    }
}

// Inicializar as quantidades para cada card
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardId = card.id;
        quantidades[cardId] = 0;
    });
});
