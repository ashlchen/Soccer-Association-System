<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
    Game.GameID, 
    Field,
    GameDate,
    PositionStatus
FROM Game LEFT OUTER JOIN GameAssignment ON Game.GameID = GameAssignment.GameID
GROUP BY GameID';

$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "GameID,Field,GameDate,PositionStatus\r\n";

    foreach($game as $g) {
        echo "\"".$g['GameID'] ."\","
            .$g['Field'] .','
            .$g['GameDate'] .','
            .$g['PositionStatus'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}