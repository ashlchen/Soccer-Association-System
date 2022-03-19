<?php

try {
  $_POST = json_decode(
              file_get_contents('php://input'), 
              true,
              2,
              JSON_THROW_ON_ERROR
          );
} catch (Exception $e) {
  header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
  // print_r($_POST);
  // echo file_get_contents('php://input');
  exit;
}

require ('class/DbConnection.php');

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();
// This is an example of a parameterized query
$sql = 'SELECT Game.Field, Game.GameDate, GameAssignment.PositionStatus, GameAssignment.RefereeID, GameAssignment.AssignmentID 
        FROM Game LEFT OUTER JOIN GameAssignment ON Game.GameID = GameAssignment.GameID 
        WHERE GameAssignment.RefereeID = ? AND Game.GameDate >? AND Game.GameDate<? ;';

$vars = [ $_POST['RefereeID'],
          $_POST['startDate'],
          $_POST['endDate'] ];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignDetail = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');   

    echo "Field, GameDate, PositionStatus\r\n";

    foreach($assignDetail as $assign) {
        echo "\"".$assign['Field'] ."\","
            .$assign['GameDate'] .','
            .$assign['PositionStatus'] ."\r\n";
    }

} else {
// Step 3: Convert to JSON
$json = json_encode($assignDetail, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}