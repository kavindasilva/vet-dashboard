<?php

namespace InlineSchema;

use Youshido\GraphQL\Execution\Processor;
use Youshido\GraphQL\Schema\Schema;
use Youshido\GraphQL\Type\Object\ObjectType;
use Youshido\GraphQL\Type\Enum\EnumType;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQL\Type\Scalar\IDType;
use Youshido\GraphQL\Type\Scalar\IntType;
use Youshido\GraphQL\Type\Scalar\DateType;
use Youshido\GraphQL\Type\Scalar\BooleanType;
use Youshido\GraphQL\Type\Scalar\FloatType;


// including autoloader
require_once __DIR__ . '/vendor/autoload.php';

$petID=(isset($_GET["pid"]))?$_GET["pid"]:1;
$petName=(isset($_GET["pname"]))?$_GET["pname"]:"Rover";
$petAge=(isset($_GET["page"]))?$_GET["page"]:2;
$petSpeci=(isset($_GET["pspeci"]))?$_GET["pspeci"]:"Dog";
$petAdmitDate=(isset($_GET["pdate"]))?$_GET["pdate"]:"2019-04-02";
$petDeleted=(isset($_GET["pdel"]))?$_GET["pdel"]:false;

//$apiData = file_get_contents('pets.json');
$apiData =  file_get_contents('petsNoq.json');
$data = json_decode($apiData, true); //print_r($dataObj);

$petID=5;
$queryInfo=file_get_contents('php://input'); 
$queryInfo=json_decode($queryInfo, true); //$queryInfo=json_encode($queryInfo); 
//print_r($queryInfo["query"]);
//$gQL=json_encode($queryInfo["query"]);
//echo $queryInfo;
//print_r($queryInfo);
//$queryInfo="";
//echo "GET: "; print_r($_GET);
//echo "POST: ";print_r($_POST);


// instantiating Processor and setting the schema
$processor = new Processor(new Schema([
    'query' => new ObjectType([
        // root query by convention has a name RootQueryType
        'name'   => 'RootQueryType',
        'fields' => [
            'admissions' => [
                'type'    => new ListType( 
                    new ObjectType([
                        'name'      => 'Admission',
                        'fields' => [
                            "id" => new IntType(), 
                            "name" => new StringType(), 
                            "speci" => new StringType(), 
                            "gender" => new StringType(), 
                            "years" => new FloatType(), 
                            "symptoms" => [ 
								'type' => new ObjectType([
									'name' => 'symptoms',
									'fields' =>  [
										"Cold" => new StringType() 
									]
								])
								
							], 
                            "admittedDate" => new StringType(),
                            "deleted" => new BooleanType(),
                        ],
                    ])
                ),

                'args' => [
                    'id' => new IntType(),
                    'name' => new StringType(),
                    "speci" => new StringType(), 
                    "gender" => new StringType(), 
                    "years" => new FloatType(), 
                    //"symptoms" => new ListType( ), 
                    "admittedDate" => new DateType(),
                    "deleted" => new BooleanType(),

                ],

                'resolve' => function ($source, $args, $info) use ($data, $queryInfo) {
                    /**/var_dump([
                        'source' => $source,
                        'args' => $args,
                        'info' => $info,
                        //'data0' => $data[0],
                    ]);
                    $selected_data = [];
                    foreach ($data as $record) {
                        //if( $record['id']== $args['id'] )
                        //    array_push($selected_data, $record);
						
						if( isset($args['speci']) && $record['speci']== $args['speci'] )
                            array_push($selected_data, $record);
                    }
                    return $selected_data; // this is rendered in ui
                }
            ]
        ]
    ])
]));

// creating payload and running it through processor
//$payload = "{ admissions{id, name, speci} }";
 $payload = "
	{
		admissions( id:$petID, name:\"$petName\", speci:\"Dog\" )
		{
			id, 
			name,
			speci,
			gender,
			symptoms,
			years,
			admittedDate
		}
	}";
//$payload=json_encode($queryInfo['query']);
//$payload=$queryInfo["query"];
//$payload="{ admissions( speci:\"Dog\" ) {id, name,speci,	gender,	years,admittedDate } }";


$processor->processPayload($payload);
//$processor->processPayload($payload, ["xx"=>2] );
// displaying result

//header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS, X-Requested-With');
//header('Access-Control-Max-Age: 1000');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
//header("Content-Type: application/json");
echo json_encode($processor->getResponseData(), JSON_PRETTY_PRINT) . "\n";