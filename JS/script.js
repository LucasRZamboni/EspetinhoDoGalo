const precos = {
  carne: 8.0,
  coracao: 8.0,
  carne_misto: 8.0,
  medalhao: 8.0,
  almondega: 8.0,
  queijo: 8.0,
  panceta: 8.0,
  linguiça: 7.0,
  pao_de_alho: 7.0,
  garrafa_skol: 4.0,
  garrafa_brahma: 4.0,
  garrafa_antartica: 4.0,
  garrafinha_original: 4.5,
  garrafinha_budweiser: 4.5,
  long_heineken: 8.5,
  lata_heineken: 7.0,
  lata_amstel: 6.0,
  lata_antartica: 6.0,
  lata_brahma: 6.0,
  lata_skol: 6.0,
  refri_lata: 6.0,
  refri_garrafinha: 3.0,
  agua: 3.0,
};

const quantidades = {};

function atualizarPrecoTotal(cardId) {
  const quantidade = quantidades[cardId];
  const precoUnitario = precos[cardId];
  const precoTotal = quantidade * precoUnitario;
  return isNaN(precoTotal) ? "0.00" : precoTotal.toFixed(2);
}

function aumentarQuantidade(cardId) {
    const itemId = cardId;
    if (!quantidades[itemId]) {
        quantidades[itemId] = 0;
    }
    quantidades[itemId]++;
    console.log(`Adicionar 1 ao pedido do ${itemId}`);
    console.log(`Quantidade atualizada para ${quantidades[itemId]}`);
    atualizarQuantidade(itemId);
}

function diminuirQuantidade(cardId) {
    const itemId = cardId;
    if (quantidades[itemId] > 0) {
        quantidades[itemId]--;
        atualizarQuantidade(itemId);
    }
}

function removerDoPedido(cardId) {
    console.log(`Remover do pedido, cardId: ${cardId}`);
    const itemId = cardId;
    const listaPedido = document.getElementById('lista-pedido');
    const itemExistente = listaPedido.querySelector(`[data-card="${itemId}"]`);

    if (itemExistente) {
        const quantidadeExistenteElement = itemExistente.querySelector('.quantidade-item');
        const precoTotalElement = itemExistente.querySelector('.preco-total');

        if (quantidadeExistenteElement && precoTotalElement) {
            const quantidadeExistente = parseInt(quantidadeExistenteElement.textContent);

            console.log(`Remover 1 do pedido do ${itemId}, quantidadeExistente: ${quantidadeExistente}`);

            if (quantidadeExistente > 1) {
                quantidadeExistenteElement.textContent = quantidadeExistente - 1;
                precoTotalElement.textContent = `R$ ${(quantidadeExistente - 1) * precos[itemId].toFixed(2)}`;
            } else {
                listaPedido.removeChild(itemExistente);
            }

            quantidades[itemId]--;  // Atualizar a quantidade no objeto quantidades
            console.log(`Chamando a função atualizarQuantidade para ${itemId}`);
            atualizarQuantidade(itemId);
        } else {
            console.error(`Elementos não encontrados para o itemId: ${itemId}`);
        }
    } else {
        console.error(`Elemento não encontrado para o itemId: ${itemId}`);
    }
}


function adicionarTodosAoPedido() {
    for (const cardId in quantidades) {
        const itemId = cardId;
      const quantidade = quantidades[itemId];
  
      if (quantidade > 0) {
        console.log(`Adicionar ${quantidade} ao pedido do ${itemId}`);
  
        const listaPedido = document.getElementById("lista-pedido");
        const itemExistente = listaPedido.querySelector(
          `[data-card="${itemId}"]`
        );
  
        if (itemExistente) {
          const quantidadeExistente = parseInt(
            itemExistente.querySelector(".quantidade-item").textContent
          );
          itemExistente.querySelector(".quantidade-item").textContent =
            quantidadeExistente + quantidade;
          const precoTotal = (quantidadeExistente + quantidade) * precos[itemId];
          itemExistente.querySelector(
            ".preco-total"
          ).innerText = `R$ ${precoTotal.toFixed(2)}`;
        } else {
          const novoItemPedido = document.createElement("li");
          novoItemPedido.innerHTML = `
                      ${quantidade}x ${itemId} - R$ ${atualizarPrecoTotal(itemId)}
                      <button class="btn btn-danger btn-sm" onclick="removerDoPedido('${itemId}')">Excluir</button>
                  `;
          novoItemPedido.setAttribute("data-card", itemId);
          listaPedido.appendChild(novoItemPedido);
        }
  
        quantidades[itemId] = 0;
        atualizarQuantidade(itemId);
      }
    }
  }
  

function fecharPedido() {
  console.log("Pedido fechado!");
  // Adicione aqui a lógica para finalizar o pedido, se necessário
}

function atualizarQuantidade(itemId) {
    const elementoQuantidade = document.querySelector(`#${itemId} .quantidade`);
    if (elementoQuantidade) {
        elementoQuantidade.textContent = quantidades[itemId].toString();
    }
}


document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".espetinho-card");
  cards.forEach((card) => {
    const cardId = card.id;
    quantidades[cardId] = 0;
  });
});
