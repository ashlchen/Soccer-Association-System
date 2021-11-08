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
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
        'SELECT 
        RefereeFirst,
        Game.GameID,
        Field,
        GameDate,
        PositionStatus
    FROM GameAssignment INNER JOIN Game ON GameAssignment.GameID = Game.GameID
    INNER JOIN Referee ON GameAssignment.RefereeID = Referee.RefereeID
    Where Referee.RefereeID = ? 
    AND 
    Game.GameDate > ?
    AND
    Game.GameDate < ?'
    );

$stmt->execute([
  $_POST['RefereeID'],
  $_POST['StartDate'],
  $_POST['EndDate']
  
 ]);

 if (isset())

 $daterangeassignment = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "RefereeFirst, GameID,Field,GameDate,PositionStatus\r\n";
  
    foreach($daterangeassignment as $d) {
      echo "\"".$d['RefereeFirst']. "\","
                .$d['GameID'] .","
                .$d['Field'] .","
                .$d['GameDate'] .","
                .$d['PositionStatus'] ."\r\n";
    }
  
  } 
  else {

  
 // Step 3: Convert to JSON
 $json = json_encode($daterangeassignment, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;}