window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  
const phrases = [
    "Stay organized,stay creative",
    "Get more done,your way",
    " Organize your day with ease",
    " Turn your plans into progress",
    " Manage your tasks effortlessly",
  ];
  
  let index = 0;
  const textElement = document.getElementById("animated-text");
  
  function slideText() {
    // Glisse vers la droite (disparaît)
    textElement.style.transform = "translateX(100%)";
    textElement.style.opacity = 0;
  
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      textElement.textContent = phrases[index];
  
      // Repositionner à gauche
      textElement.style.transform = "translateX(-100%)";
  
      setTimeout(() => {
        // Glisse vers le centre (réapparaît)
        textElement.style.transform = "translateX(0)";
        textElement.style.opacity = 1;
      }, 100);
    }, 300);
  }
  
  setInterval(slideText, 4000);
  window.addEventListener('scroll', function() {
    const contactBtn = document.querySelector('.btn-contact');
    if (window.scrollY > 50) {
      contactBtn.classList.add('scrolled');
    } else {
      contactBtn.classList.remove('scrolled');
    }
  });
  window.addEventListener('scroll', function() {
    const contactBtn = document.querySelector(' .signup-btn');
    if (window.scrollY > 50) {
      contactBtn.classList.add('scrolled');
    } else {
      contactBtn.classList.remove('scrolled');
    }
  });
  window.addEventListener('scroll', function() {
    const contactBtn = document.querySelector('.login-btn');
    if (window.scrollY > 50) {
      contactBtn.classList.add('scrolled');
    } else {
      contactBtn.classList.remove('scrolled');
    }
  });