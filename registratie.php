<?php
 
 //Put your own hosting server HOST name here.
 $HostName = "localhost";
 
 //Put your own MySQL database name here.
 $DatabaseName = "id16074770_test1";
 
 //Put your own MySQL database User Name here.
 $HostUser = "id16074770_user1";
 
 //Put your own MySQL database Password here.
 $HostPass = "P@ssword1234";
 
 // Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $Received_JSON variable.
 $Received_JSON = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($Received_JSON,true);
 
 // Populate User name from JSON $obj array and store into $user_name variable.
 $user_name = $obj['user_name'];
 
 // Populate User email from JSON $obj array and store into $user_email variable.
 $user_email = $obj['user_email'];
 
 // Populate Password from JSON $obj array and store into $user_password variable.
 $user_password = $obj['user_password'];
 
 //Checking User entered Email is already exist or not in MySQL database using SQL query.
 $CheckSQL = "SELECT * FROM user_data_table WHERE user_email='$user_email'";
 
 // Executing SQL Query.
 $check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
if(isset($check)){
 
 $Duplicate_email = 'Email Already Exist, Please Try Again With Different Email.';
 
 // Converting the message into JSON format.
 $Duplicate_email_Json = json_encode($Duplicate_email);
 
 // Echo, Printing the message on screen.
 echo $Duplicate_email_Json ; 
 
 }
 else{
 
 // Creating SQL query and insert the record into MySQL database table if email dose not exist in database.
 $Sql_Query = "insert into user_data_table (user_name,user_email,user_password) values ('$user_name','$user_email','$user_password')";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // Show the success message.
 $MSG = 'User Registered Successfully' ;
 
 // Converting the message into JSON format.
 $json = json_encode($MSG);
 
 // Echo, Print the message on screen.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 }
 mysqli_close($con);
?>