

  // Таймер обратного отсчета
  const weddingDate = new Date('August 19, 2024 00:00:00').getTime();
  
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
  
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').innerHTML = 'The wedding has started!';
    }
  }, 1000);
  
  // Отправка ответа на приглашение
  function submitRSVP(isAttending) {
    const name = document.getElementById('name').value;
    if (name === '') {
      alert('Пожалуйста, введите ваше имя.');
      return;
    }
    const attendance = isAttending ? 'Да' : 'Нет';
    saveRSVPToFirestore(name, attendance);
  }
