
document.addEventListener("DOMContentLoaded", function () {
  var musicControl = document.getElementById("music-control");
  var backgroundMusic = document.getElementById("background-music");
  var musicTooltip = document.getElementById("music-tooltip");
   // Show the music tooltip initially
   musicTooltip.style.display = 'block';

   // Hide the tooltip after 5 seconds or on first click
   setTimeout
  // Try to play the music
  backgroundMusic.play().then(() => {
    musicControl.classList.add("rotating");
  }).catch((error) => {
    // Handle the error if autoplay fails
    console.log("Autoplay was prevented:", error);
    document.body.addEventListener('click', function () {
      backgroundMusic.play();
      musicControl.classList.add("rotating");
    }, { once: true });
  });

  // Add click event to the music control button
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
