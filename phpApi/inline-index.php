<?php
namespace InlineSchema;

use Youshido\GraphQL\Execution\Processor;
use Youshido\GraphQL\Schema\Schema;
use Youshido\GraphQL\Type\Object\ObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

// including autoloader
require_once __DIR__ . '/vendor/autoload.php';

$apiData = file_get_contents('pets.json');

// instantiating Processor and setting the schema
$processor = new Processor(new Schema([
    'query' => new ObjectType([
        // root query by convention has a name RootQueryType
        'name'   => 'RootQueryType',
        'fields' => [
            'latestPost' => [
                'type'    => new ObjectType([ // Post type is being created as ObjectType
                    'name'    => 'Post', // name of our type – "Post"
                    'fields'  => [
                        'title'   => new StringType(),  // defining "title" field, type - String
                        'summary' => new StringType(),  // defining "summary" field, type - String
                    ],
                ]),
                'resolve' => function () {          // resolver for latestPost field
                    return [                        // for now it returns a static array with data
                        "title"   => "New approach in API has been revealed",
                        "summarys" => "In two words - GraphQL Rocks!",
                        "additonal" => "additonal field",
                    ];
                }
            ]
        ]
    ])
]));

// creating payload and running it through processor
$payload = '{ latestPost { title, summary } }';
$processor->processPayload($payload);
// displaying result
echo json_encode($processor->getResponseData()) . "\n";