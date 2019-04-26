<?php
	//get the index from URL
	$index = $_GET['index'];
 
	//get json data
	$data = file_get_contents('pets.json');
	$data_array = json_decode($data);
 
	//assign the data to selected index
	$row = $data_array[$index];
 
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>CRUD Operation on JSON File using PHP</title>
</head>
<body>
<form method="POST">
	<a href="pet.php">Back</a>
	<p>
		<label for="id">ID</label>
		<input type="text" id="id" name="id" value="<?php echo $row->id; ?>">
	</p>
	<p>
		<label for="firstname">Firstname</label>
		<input type="text" id="firstname" name="firstname" value="<?php echo $row->firstname; ?>">
	</p>
	<p>
		<label for="lastname">Lastname</label>
		<input type="text" id="lastname" name="lastname" value="<?php echo $row->lastname; ?>">
	</p>
	<p>
		<label for="address">Address</label>
		<input type="text" id="address" name="address" value="<?php echo $row->address; ?>">
	</p>
	<p>
		<label for="gender">Gender</label>
		<input type="text" id="gender" name="gender" value="<?php echo $row->gender; ?>">
	</p>
	<input type="submit" name="save" value="Save">
</form>
 
<?php
	if(isset($_POST['save'])){
		//set the updated values
		$input = array(
			'id' => $_POST['id'],
			'firstname' => $_POST['firstname'],
			'lastname' => $_POST['lastname'],
			'address' => $_POST['address'],
			'gender' => $_POST['gender']
		);
 
		//update the selected index
		$data_array[$index] = $input;
 
		//encode back to json
		$data = json_encode($data_array, JSON_PRETTY_PRINT);
		file_put_contents('pets.json', $data);
 
		header('location: pet.php');
	}
?>
</body>
</html>