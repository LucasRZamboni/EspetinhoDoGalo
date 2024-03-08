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
  // ------------------------------------
  garrafa_skol: 4.0,
  garrafa_brahma: 4.0,
  garrafa_antartica: 4.0,
  // ------------------------------------
  garrafinha_original: 4.5,
  garrafinha_budweiser: 4.5,
  long_heineken: 8.5,
  // ------------------------------------
  lata_heineken: 7.0,
  lata_amstel: 6.0,
  lata_antartica: 6.0,
  lata_brahma: 6.0,
  lata_skol: 6.0,
  // ------------------------------------
  refri_lata: 6.0,
  refri_garrafinha: 3.0,
  // ------------------------------------
  agua: 3.0,
};

function diminuirQuantidade(item) {
  const quantidadeElement = document.querySelector(`[data-card="${item}"]`);
  let quantidade = parseInt(quantidadeElement.textContent, 10);

  // Verificar se a quantidade é maior que zero antes de diminuir
  if (quantidade > 0) {
    quantidade--;
    quantidadeElement.textContent = quantidade;
  }
}

function aumentarQuantidade(item) {
  const quantidadeElement = document.querySelector(`[data-card="${item}"]`);
  let quantidade = parseInt(quantidadeElement.textContent, 10);

  // Você pode adicionar lógica adicional aqui, se necessário

  quantidade++;
  quantidadeElement.textContent = quantidade;
}

function atualizarPreco(cardElement, item) {
  const precoElement = cardElement.querySelector(".preco");

  if (precos.hasOwnProperty(item)) {
    precoElement.textContent = `R$ ${precos[item].toFixed(2)}`;
  } else {
    console.error(`Item "${item}" não encontrado nos preços.`);
  }
}

function adicionarAoPedido() {
  const cards = document.querySelectorAll(".espetinho-card");
  const listaPedido = document.getElementById("lista-pedido");
  const totalPedidoElement = document.getElementById("valor-total");

  let totalPedido = 0;

  // Mapear os itens existentes na lista de pedidos para evitar duplicatas
  const itensExistentes = new Map();

  Array.from(listaPedido.children).forEach((item) => {
    const partes = item.textContent.split("-");

    if (partes.length === 2) {
      const quantidadeExistente = parseInt(partes[0].trim().split("x")[0]) || 0; // Obter apenas a quantidade numérica
      const itemId = partes[1].trim().split("x")[1]?.trim() || ""; // Obter apenas o ID do item

      const valorTotal =
        parseFloat(
          partes[1].trim().replace("Total: R$", "").replace(",", ".")
        ) || 0;

      // Verificar se o itemId é válido antes de atualizar o mapa de itens existentes
      if (itemId) {
        // Atualizar o mapa de itens existentes
        itensExistentes.set(itemId, quantidadeExistente);
      }

      totalPedido += valorTotal;
    }
  });

  cards.forEach(function (card) {
    const itemId = card.id;
    const quantidadeElement = card.querySelector(`[data-card="${itemId}"]`);
    const quantidade = parseInt(quantidadeElement.textContent, 10);

    if (quantidade > 0) {
      const precoElement = card.querySelector(".preco");
      const precoUnitario = parseFloat(
        precoElement.textContent.replace("R$ ", "")
      );

      // Verificar se o item já existe na lista de pedidos
      if (itensExistentes.has(itemId)) {
        // Se o item já existe, somar a quantidade
        const quantidadeExistente = itensExistentes.get(itemId);
        const novaQuantidade = quantidadeExistente + quantidade;

        const novoTotal = novaQuantidade * precoUnitario;

        // Atualizar o item existente na lista de pedidos
        const itemExistente = Array.from(listaPedido.children).find((item) =>
          item.textContent.includes(itemId)
        );
        itemExistente.innerHTML = `${novaQuantidade}x ${itemId} - Total: R$ ${novoTotal.toFixed(
          2
        )} <button class="btn btn-danger" onclick="removerDoPedido('${itemId}')">Remover</button>`;
      } else {
        // Se o item não existe na lista, adicionar normalmente
        const novoItem = document.createElement("li");
        const valorTotal = quantidade * precoUnitario;
        novoItem.innerHTML = `${quantidade}x ${itemId} - Total: R$ ${valorTotal.toFixed(
          2
        )} <button class="btn btn-danger" onclick="removerDoPedido('${itemId}')">Remover</button>`;
        listaPedido.appendChild(novoItem);

        // Atualizar o mapa de itens existentes
        itensExistentes.set(itemId, quantidade);
      }

      // Zerar a quantidade no card após adicionar ao pedido
      quantidadeElement.textContent = "0";
    }
  });

  // Atualize o valor total na interface
  totalPedidoElement.textContent = `R$ ${totalPedido.toFixed(2)}`;
}

function removerDoPedido(itemId) {
  const listaPedido = document.getElementById("lista-pedido");

  const itemRemover = Array.from(listaPedido.children).find((item) =>
    item.textContent.includes(itemId)
  );

  if (itemRemover) {
    const partes = itemRemover.textContent.split("-");
    const quantidadeExistente = parseInt(partes[0].trim().split("x")[0]);

    if (quantidadeExistente > 1) {
      // Reduzir a quantidade do item em 1
      const novaQuantidade = quantidadeExistente - 1;
      const precoUnitario =
        parseFloat(
          partes[1].trim().replace("Total: R$", "").replace(",", ".")
        ) / quantidadeExistente;
      const novoTotal = novaQuantidade * precoUnitario;

      itemRemover.innerHTML = `${novaQuantidade}x ${itemId} - Total: R$ ${novoTotal.toFixed(
        2
      )} <button class="btn btn-danger" onclick="removerDoPedido('${itemId}')">Remover</button>`;
    } else {
      // Se a nova quantidade for igual a 1, remover completamente o item
      listaPedido.removeChild(itemRemover);
    }
    // Atualize o valor total na interface após remover o item
    atualizarValorTotalPedido();
  } else {
    console.log("Item não encontrado.");
  }
}

function atualizarValorTotalPedido() {
  const listaPedido = document.getElementById("lista-pedido");
  const totalPedidoElement = document.getElementById("valor-total");

  let totalPedido = 0;

  Array.from(listaPedido.children).forEach((item) => {
    const partes = item.textContent.split("-");
    const valorItem = parseFloat(
      partes[1].trim().replace("Total: R$", "").replace(",", ".")
    );
    totalPedido += valorItem;
  });

  totalPedidoElement.textContent = `R$ ${totalPedido.toFixed(2)}`;
}

// Restante do seu código permanece o mesmo...

// Exemplo de uso para atualizar o preço de todos os cards
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".espetinho-card");
  cards.forEach(function (card) {
    const itemId = card.id;
    atualizarPreco(card, itemId);
  });
});
