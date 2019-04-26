
<?php

	/**
		This file returns all pet information as a JSON
	*/

	$data = file_get_contents('pets.json');
	//$data = json_decode($data);


	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
	header("Content-Type: application/json");

	echo $data;
	
?>

<?php


?>




