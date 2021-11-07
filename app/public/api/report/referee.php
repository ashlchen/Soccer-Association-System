<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
    Referee.RefereeID, 
    RefereeFirst,
    COUNT(AssignmentID) AS AssignmentCount
FROM Referee LEFT OUTER JOIN GameAssignment ON Referee.RefereeID = GameAssignment.RefereeID
GROUP BY RefereeID';

$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$gameAssignment = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "RefereeID,RefereeFirst,AssignmentCount\r\n";

    foreach($gameAssignment as $a) {
        echo "\"".$a['RefereeID'] ."\","
            .$a['RefereeFirst'] .','
            .$a['AssignmentCount'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($gameAssignment, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}