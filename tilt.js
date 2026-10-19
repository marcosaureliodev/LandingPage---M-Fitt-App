document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const card = document.getElementById('tiltCard');

  if (!card) return;

  // Usa o cardContainer se existir, ou o próprio card como área de interação
  const interactionArea = cardContainer || card;

  interactionArea.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
  });

  interactionArea.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    
    // Centro do card na tela
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distância do cursor em relação ao centro
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Intensidade máxima da rotação em graus
    const maxTilt = 5;

    // Normaliza os valores de rotação baseando-se no tamanho do card
    const rotateX = Math.max(Math.min((deltaY / (rect.height / 2)) * -maxTilt, maxTilt), -maxTilt);
    const rotateY = Math.max(Math.min((deltaX / (rect.width / 2)) * maxTilt, maxTilt), -maxTilt);

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
  });

  interactionArea.addEventListener('mouseleave', () => {
    // Retorna suavemente à posição original
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});
