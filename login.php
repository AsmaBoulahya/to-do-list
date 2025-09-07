<?php
session_start();

// Connexion à la base de données
$host = 'localhost';
$dbname = 'todolist_app';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Vérifie si les données du formulaire ont été envoyées
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? '';
    $password = $_POST["password"] ?? '';

    // Requête pour vérifier l'utilisateur
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        // Connexion réussie
        $_SESSION["user_id"] = $user["id"];
        header("Location: do_me_page.html");
        exit();
    } else {
        // Identifiants incorrects
        echo "<script>alert('Email ou mot de passe incorrect !'); window.location.href='login.html';</script>";
    }
}
?>
