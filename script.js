class PageController {
  constructor() {
    this.init();
  }

  init() {
    this.initNavButtons();
    this.initFloatingRoses();
     this.initArrowButton();
    this.initNextButton();
     this.initCountdown();
    this.initWeather();
    this.handleRSVP();  // ✅ Always run — no URL check
  }

 initNavButtons() {
  const buttons = document.querySelectorAll('.nav-btn');
  if (buttons.length === 0) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const btnText = button.textContent.toLowerCase();
      const pageMap = {
        home: 'page3.html',
        date: 'page4.html',       
        location: 'page5.html',
        rsvp: 'page6.html'
      };

      if (pageMap[btnText]) {
        window.location.href = pageMap[btnText];
      }
    });
  });
}

initArrowButton() {
    const arrowBtn = document.getElementById('arrowBtn');
    if (arrowBtn) {
      arrowBtn.addEventListener('click', () => {
        window.location.href = 'page2.html';
      });
    }
  }
  
  initFloatingRoses() {
    const container = document.querySelector('.floating-flowers');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const span = document.createElement('span');
      const img = document.createElement('img');
      img.src = `assets/images/rose1.jpg`;
      img.alt = 'flower';
      span.appendChild(img);
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 6}s`;
      span.style.width = '40px';
      span.style.height = '40px';
      container.appendChild(span);
    }
  }
initWeather() {
 const apiKey = '1d6cc920f32d4794b9c112349250107'; // Replace this
const city = 'Positano';
const forecastDays = 3;

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${forecastDays}&aqi=no&alerts=no`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('weatherForecast');
    container.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
      const date = new Date(day.date).toDateString();
const icon = "https:" + day.day.condition.icon;
      const text = day.day.condition.text;
      const temp = `${day.day.avgtemp_c}°C`;

      const forecastHTML = `
        <div class="day-forecast">
          <div>
            <strong>${date}</strong><br>
            ${text} – ${temp}
          </div>
          <img src="${icon}" alt="${text}">
        </div>
      `;
      container.innerHTML += forecastHTML;
    });
  })
  .catch(() => {
    document.getElementById('weatherForecast').innerHTML = 'Unable to load weather forecast.';
  });


}
// Inside PageController class, add:
initCountdown() {
  const display = document.getElementById('countdown');
  if (!display) return;

  const target = new Date('July 20, 2025 00:00:00').getTime();

  const update = () => {
    const now = Date.now();
    const diff = target - now;

    if (diff < 0) {
      display.innerHTML = '<span>0d</span><span>0h</span><span>0m</span><span>0s</span>';
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    display.innerHTML = `
      <span>${d}d</span>
      <span>${h}h</span>
      <span>${m}m</span>
      <span>${s}s</span>
    `;
  };

  update();
  const timer = setInterval(update, 1000);
}
initNextButton() {
  const nextBtn = document.getElementById('nextBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const nextBtnSpinner = document.getElementById('nextBtnSpinner');
  const guestInput = document.getElementById('guestName');

  if (guestInput) {
    guestInput.addEventListener('input', () => {
      nextBtn.disabled = guestInput.value.trim() === '';
    });
  }

  if (nextBtn && nextBtnText && nextBtnSpinner && guestInput) {
    nextBtn.addEventListener('click', () => {
      const name = guestInput.value.trim();
      if (name !== '') {
        // Start loading spinner
        nextBtnText.textContent = 'Loading...';
        nextBtnSpinner.style.display = 'inline-block';

        localStorage.setItem('guestName', name);

        // Delay for visual effect (simulate loading)
        setTimeout(() => {
          window.location.href = 'page3.html';
        }, 1200);
      } else {
        alert('Please enter your name before proceeding.');
      }
    });
  }
}

 /*
initRSVPFormHandler() {
  
      this.form.addEventListener('change', (e) => {
        if (e.target.name === 'attendance') {
          if (e.target.value === 'yes') {
            this.guestCountGroup.style.display = 'block';
          } else {
            this.guestCountGroup.style.display = 'none';
          }
        }
      });

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const attendance = this.form.elements['attendance'].value;
        const guestName = localStorage.getItem('guestName') || 'Guest';
        const guests = document.getElementById('guestCount').value || 0;

        if (attendance === 'yes') {
          this.message.innerHTML = `Thank you, ${guestName}! We’re excited to see you and your ${guests - 1} guests!`;
          this.launchParty();
        } else {
          this.message.textContent = `We'll miss you, ${guestName}! Thanks for letting us know.`;
        }
      });
    }

    launchParty() {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  

  document.addEventListener('DOMContentLoaded', () => {
    new RSVPFormHandler('rsvpForm', 'guestCountGroup', 'rsvpMessage');
  });*/

}
new PageController();
