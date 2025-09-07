<?php
// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "todolist_app");

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données du formulaire
    $task_name = $_POST['task_name'];
    $responsible = $_POST['responsible'];
    $date = $_POST['date'];
    $priority = $_POST['priority'];
    $category = $_POST['category'];
    $status = $_POST['status'];

    // Préparer et exécuter la requête d'insertion dans la base de données
    $stmt = $conn->prepare("INSERT INTO tasks (task_name, responsible, date, priority, category, status) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $task_name, $responsible, $date, $priority, $category, $status);

    if ($stmt->execute()) {
        echo "<p>Tâche ajoutée avec succès !</p>";
    } else {
        echo "<p>Erreur lors de l'ajout de la tâche : " . $stmt->error . "</p>";
    }

    // Fermer la requête préparée
    $stmt->close();
}

// Récupérer et afficher les tâches
$result = $conn->query("SELECT * FROM tasks ORDER BY date DESC");

echo "<div class='tasks list' id='tasksContainer'>";
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='task'>";
        echo "<strong>" . htmlspecialchars($row['task_name']) . "</strong><br>";
        echo "<small>Responsable: " . htmlspecialchars($row['responsible']) . " | Date: " . htmlspecialchars($row['date']) . " | Priorité: " . htmlspecialchars($row['priority']) . " | Statut: " . htmlspecialchars($row['status']) . "</small>";
        echo "</div>";
    }
} else {
    echo "<p>Aucune tâche disponible.</p>";
}
echo "</div>";

// Fermer la connexion à la base de données
$conn->close();
?>
