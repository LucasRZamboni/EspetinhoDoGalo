function redirecionarParaWhatsApp() {
    // Adicione aqui o número do WhatsApp do seu amigo
    const numeroWhatsApp = 'number';
    // const numeroWhatsApp = 'number';
    
    // Adicione a mensagem padrão (pode personalizar conforme necessário)
    const mensagem = 'Olá! Gostaria de fazer um pedido de espetinhos.';

    // Construa o link do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    // Redirecionar para o WhatsApp
    window.open(linkWhatsApp, '_blank');
}
