<?php
 // Header om toegang te verlenen
 header("Access-Control-Allow-Origin: *");
 
 // Input verwerken
 $Received_JSON = file_get_contents('php://input');
 
 $obj = json_decode($Received_JSON,true);
 
 $lln = $obj['lln'];

 // Gegevens om verbinding te maken met de database
 $HostName = "localhost";
 $DatabaseName = "id16074770_test1";
 $HostUser = "id16074770_user1";
 $HostPass = "P@ssword1234";
 
 // Verbinding maken met de database
 $con = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
 if ($con->connect_error) {
     die(json_encode("Connection failed: " . $con->connect_error));
 }
 
 // SQL-query uitvoeren
 $SelectSQL = "SELECT * from Scans WHERE `Leerlingnummer`=$lln";
 $check = mysqli_fetch_all(mysqli_query($con,$SelectSQL));
 
 // Resultaat terugsturen
 echo json_encode($check);
 
 // Verbinding verbreken
 mysqli_close($con);
 
?>