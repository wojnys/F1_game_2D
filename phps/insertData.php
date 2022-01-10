<?php

$conn = new mysqli('localhost', 'root', '', 'f1_game');

$driver_id= $_POST["driver"];
$circuit_id= $_POST["circuit"];
$sql = "update choose_skin set active_driver_index=$driver_id, active_circuit_index=$circuit_id";
$conn->query($sql);

?>