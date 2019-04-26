

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>CRUD Operation on JSON File using PHP</title>
</head>
<body>
<a href="add.php">Add</a>
<table border="1">
	<thead>
		<th>ID</th>
		<th>Name</th>
		<th>speci</th>
		<th>gender</th>
		<th>age(years)</th>
		<th>symptoms</th>
		<th>admitted date</th>
	</thead>
	<tbody>
		<?php
			//fetch data from json
			$data = file_get_contents('pets.json');
			//decode into php array
			$data = json_decode($data);
 
			$index = 0;
			foreach($data as $row){
				echo "
					<tr>
						<td>".$row->id."</td>
						<td>".$row->name."</td>
						<td>".$row->speci."</td>
						<td>".$row->gender."</td>
						<td>".$row->years."</td>
						<td>";foreach ($row->symptoms as $value){
							echo $value;
						}echo "</td>
						<td>".$row->admittedDate."</td>
						<td>
							<a href='edit.php?index=".$index."'>Edit</a>
							<a href='delete.php?index=".$index."'>Delete</a>
						</td>
					</tr>
				";
 
				$index++;
			}
		?>
	</tbody>
</table>
</body>
</html>

<?php


?>




