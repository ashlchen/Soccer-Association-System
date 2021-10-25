<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM Referee';
$vars = [];

if (isset($_GET['referee'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM Referee WHERE RefereeID = ?';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['referee'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$referee = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($referee, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;