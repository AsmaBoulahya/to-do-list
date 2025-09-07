const password = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click', function () {
      const isHidden = password.type === 'password';
      password.type = isHidden ? 'text' : 'password';
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });

    const confirmPassword = document.getElementById('confirm_password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    toggleConfirmPassword.addEventListener('click', function () {
      const isHidden = confirmPassword.type === 'password';
      confirmPassword.type = isHidden ? 'text' : 'password';
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
      // Fonction pour obtenir la valeur de "email" depuis l’URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  
  // Si l’email est présent, on le met dans le champ
  if (email) {
    document.getElementById("signupEmail").value = email;
  }