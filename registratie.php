<?php

 // Header om toegang te verlenen
 header("Access-Control-Allow-Origin: *");

 // Input verwerken
 $Received_JSON = file_get_contents('php://input');
 
 $obj = json_decode($Received_JSON,true);
 $code = $obj['code'];
 $date = $obj['date'];
 $time = $obj['time'];
 $lln = $obj['lln'];
 $positiveFeedback = $obj['positiveFeedback'];
 
 // Gegevens voor connectie met database
 $HostName = "localhost";
 $DatabaseName = "id16074770_test1";
 $HostUser = "id16074770_user1";
 $HostPass = "P@ssword1234";
 
 // Connectie maken met database
 $con = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);

 // Stop als er een fout is
 if ($con->connect_error) {
     die(json_encode("Connection failed: " . $con->connect_error));
 }
 
 // De SQL-query uitvoeren
 $InsertSQL =  "INSERT INTO Scans values ('$code', '$lln', '$date', '$time')";
 if (mysqli_query($con,$InsertSQL)) {
    echo json_encode($positiveFeedback);
 } else {
    echo json_encode("Something went wrong, unknown cause");
 }
 
 // Verbinding met database verbreken
 mysqli_close($con);
?>