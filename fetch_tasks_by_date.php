<?php
$conn = new mysqli("localhost", "root", "", "todolist_app");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$date = $_GET['date'] ?? '';
if (!$date) {
  echo "No date provided.";
  exit;
}

$stmt = $conn->prepare("SELECT * FROM tasks WHERE date = ?");
$stmt->bind_param("s", $date);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo "<p>No tasks for this date.</p>";
}

while ($row = $result->fetch_assoc()) {
  echo "<div class='task'>";
  echo "<strong>" . htmlspecialchars($row['name']) . "</strong><br>";
  echo "👤 " . htmlspecialchars($row['responsible']) . " | 🏷️ " . htmlspecialchars($row['category']) . " | 🔥 " . htmlspecialchars($row['priority']) . " | 📌 " . htmlspecialchars($row['status']);
  echo "</div><hr>";
}

$stmt->close();
$conn->close();
?>
