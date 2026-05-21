function enviarWhats(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !mensagem) {
        alert('Por favor, preencha seu nome e mensagem antes de enviar.');
        return;
    }

    const telefone = '5513997202912';
    const texto = `Olá! Me chamo ${nome}. ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;
    window.open(url, '_blank')
}