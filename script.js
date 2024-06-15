// Таймер обратного отсчета
const weddingDate = new Date('August 18, 2024 00:00:00').getTime();

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

// Карта Google Maps
function initMap() {
    const location = { lat: 55.7558, lng: 37.6176 }; // Координаты Москвы (пример)
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location
    });
    const marker = new google.maps.Marker({ position: location, map: map });
}

// Опрос RSVP
function submitRSVP(isAttending) {
    const name = document.getElementById('name').value;
    if (name === '') {
        alert('Пожалуйста, введите ваше имя.');
        return;
    }
    const attendance = isAttending ? 'Да' : 'Нет';

    fetch('https://your-heroku-app.herokuapp.com/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, attendance }),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Ошибка:', error));
}

window.onload = initMap;
