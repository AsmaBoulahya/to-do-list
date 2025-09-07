<?php
// Connexion à la base
$host = 'localhost';
$dbname = 'todolist_app';
$user = 'root';
$pass = ''; // ou 'root' si tu es sur Mac

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $fullname = htmlspecialchars($_POST['fullname']);
        $email = htmlspecialchars($_POST['email']);
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // 🔐

        $stmt = $pdo->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$fullname, $email, $password]);

        // ✅ Redirection vers dashboard
        header("Location: multistep_page.html");
        exit;
    } else {
        echo "Méthode non autorisée.";
    }
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
