
import {sum, validateExpression} from "../src/common/validateRule"

let expressionToEvaluate = null
/**
 * positive test cases
 * function to check: validateExpression
 */

/** moment() evaluation */
test('expression "moment()" will give a valid parse tree', () => {
    expect( 
        validateExpression("moment()")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : []
    });
});

/** vaild function with parameter */
test('expression "moment(a)" will give a valid parse tree', () => {
    expect(
        validateExpression("moment('a')")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : [
            {
                type: 'string',
                value: 'a'
            }
        ]
    });
});

/** valid function with more than one string parameter */
test('expression "moment(\'1\', \'b\', \'c\')" will give a valid parse tree', () => {
    expect(
        validateExpression("moment('1', 'b', 'cc')")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : [
            {
                type: 'string',
                value: '1'
            },
            {
                type: 'string',
                value: 'b'
            },
            {
                type: 'string',
                value: 'cc'
            }
        ]
    });
});

/** valid function with more than one integer parameter */
test('expression "moment(1, 2, 3)" will give a valid parse tree', () => {
    expect(
        validateExpression("moment(1, 2, 3)")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : [
            {
                type: 'number',
                value: 1
            },
            {
                type: 'number',
                value: 2
            },
            {
                type: 'number',
                value: 3
            }
        ]
    });
});

/** valid function with mixed parameters */
test('expression "moment(1, isBefore(2))" will give a valid parse tree', () => {
    expect(
        validateExpression("moment(1, isBefore(2))")
    )
    .toMatchObject({
        "type": "function",
        "name": "moment",
        "parameters": [
            {
                "type": "number",
                "value": 1
            },
            {
                "type": "function",
                "name": "isBefore",
                "parameters": [
                    {
                        "type": "number",
                        "value": 2
                    }
                ]
            }
        ]
    });
});

/** valid function with mixed parameters */
test('expression "moment(1, "sample", isBefore(2))" will give a valid parse tree', () => {
    expect(
        validateExpression("moment(1, 'sample', isBefore(2))")
    )
    .toMatchObject({
        "type": "function",
        "name": "moment",
        "parameters": [
            {
                "type": "number",
                "value": 1
            },
            {
                "type": "string",
                "value": "sample"
            },
            {
                "type": "function",
                "name": "isBefore",
                "parameters": [
                    {
                        "type": "number",
                        "value": 2
                    }
                ]
            }
        ]
    });
});

/** valid function with mixed parameters */
test('expression "moment(1, isBefore(isTrue(5,5), 3))" will give a valid parse tree', () => {
    expect(
        validateExpression("moment(1, isBefore(isTrue(5, '5'), 3))")
    )
    .toMatchObject({
        "type": "function",
        "name": "moment",
        "parameters": [
            {
                "type": "number",
                "value": 1
            },
            {
                "type": "function",
                "name": "isBefore",
                "parameters": [
                    {
                        "type": "function",
                        "name": "isTrue",
                        "parameters":[
                            {
                                "type": "number",
                                "value": 5
                            },
                            {
                                "type": "string",
                                "value": "5"
                            }
                        ]
                    },
                    {
                        "type": "number",
                        "value": 3
                    }
                ]
            }
        ]
    });
});


/**
 * negative test cases
 */


/** passing empty input */
test('empty expression should throw error', () => {
    expect( () =>
        validateExpression("")
    )
    .toThrow( /^Expected function but/) ;
});

/** passing a null input */
test('null expression should throw error', () => {
    expect( () =>
        validateExpression() // null gives -> Cannot read property 'charAt' of null
    )
    //.toThrow();
    .toThrow("Cannot read property 'charAt' of undefined") ;
});

 /** pure string evaluation */
test('a pure string expression will fail to parse', () => {
    expect(() => {
        validateExpression("blahblahblah");
    }).toThrow();
});

/** undefined function */
test('expression "functionFour(a)" will throw an undefined', () => {
    expect( ()=>
        validateExpression("functionFour('a')")
    )
    .toThrow("Undefined Function");
});

/** invalid function with parameters as array */
test('expression "moment(1, [2, 3])" will throw an error like "Expected function but..."', () => {
    let err=null;
    expect( () =>
        validateExpression("moment(1, [2, 3])")
    )
    .toThrow( /^Expected function but/) ;
    //err.toMatch(/^Expected function but/);
});

/** passing just a value makes an error */
test('expression "stringValue" will throw an error like "Expected function but..."', () => {
    let err=null;
    expect( () =>
        validateExpression("stringValue")
    )
    .toThrow( /^Expected function but/) ;
});

/** passing invalid string */
test('expression "moment(1, invalidString)" will throw error', () => {
    expect( () =>
        validateExpression("moment(1, invalidString)")
    )
    .toThrow( /^Expected function but/) ;
});
