<?php
$data  = array();
$conn = new mysqli('localhost', 'root', '', 'f1_game');


$query = "SELECT * FROM choose_skin"; 
$result = $conn->query($query);

while($rows=$result->fetch_assoc())
{
    $data[0]= $rows['active_driver_index'];
    $data[1]= $rows['active_circuit_index'];
}
echo json_encode($data);
