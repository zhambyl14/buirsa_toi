document.addEventListener("DOMContentLoaded", function () {
  var musicControl = document.getElementById("music-control");
  var backgroundMusic = document.getElementById("background-music");

  // Запускаем музыку по умолчанию
  backgroundMusic.play();
  musicControl.classList.add("rotating");

  // Добавляем обработчик события для кнопки управления музыкой
  musicControl.addEventListener("click", function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicControl.classList.add("rotating");
    } else {
      backgroundMusic.pause();
      musicControl.classList.remove("rotating");
    }
  });

  AOS.init();

  // Таймер обратного отсчета
  const weddingDate = new Date('August 19, 2024 21:00:00').getTime();
  
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
  
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById('countdown').innerHTML = `${days} Күн ${hours} сағат ${minutes} минут ${seconds} секунд қалды`;
  
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').innerHTML = 'The wedding has started!';
    }
  }, 1000);
  
  // Отправка ответа на приглашение
  function submitRSVP(isAttending) {
    const name = document.getElementById('name').value;
    if (name === '') {
      alert('Сізді асыға күтеміз!');
      return;
    }
    const attendance = isAttending ? 'Я' : 'Жоқ';
    saveRSVPToFirestore(name, attendance);
  }
});
