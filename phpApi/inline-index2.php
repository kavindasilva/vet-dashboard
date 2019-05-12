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

//$apiData = file_get_contents('pets.json');
$apiData =  file_get_contents('petsNoq.json');
$data = json_decode($apiData, true); //print_r($dataObj);

$petID=5;


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
                        'fields'    => [
                            "id"    => new IntType(), 
                            "name"  => new StringType(), 
                            "speci" => new StringType(), 
                            "gender"  => new StringType(), 
                            "years"  => new FloatType(), 
                            //"symptoms" => new ListType( ), 
                            "admittedDate" => new DateType(),
                            "deleted"  => new BooleanType(),
                        ],
                    ])
                ),
                'args' => [
                    'id' => new IntType(),
                    'name' => new StringType(),
                    "speci" => new StringType(), 
                    "gender"  => new StringType(), 
                    "years"  => new FloatType(), 
                    //"symptoms" => new ListType( ), 
                    "admittedDate" => new DateType(),
                    "deleted"  => new BooleanType(),

                ],
                'resolve' => function ($source, $args, $info) use ($data) {
                    var_dump([
                        'source' => $source,
                        'args' => $args,
                        'info' => $info,
                        //'data0' => $data[0],
                    ]);
                    $selected_data = [];
                    foreach ($data as $record) {
                        if( $record['id']== $args['id'] )
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
//$payload = "{ admissions( id:$petID, name:\"k\" ){id, name, speci } }";
$payload = "{ admissions(  ){id, name, speci } }";
//$payload = "{ admissions( id:2 ){id, name, speci } }";
//$payload = "{ admissions(  ){id, name, speci, symptoms} }";
//$payload = "{ admissions( first: '2' ){id, name, speci, years} }";
//$payload = "{ admissions( last:5 ){id, name, speci} }";

$processor->processPayload($payload);
//$processor->processPayload($payload, ["xx"=>2] );
// displaying result
echo json_encode($processor->getResponseData(), JSON_PRETTY_PRINT) . "\n";