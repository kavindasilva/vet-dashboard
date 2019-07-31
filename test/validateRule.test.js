import {validateExpression, evaluateSubTree, evaluateExpression} from "../src/common/validateRule"
//import moment from "../node_modules/moment/moment"

import moment from "moment";
let expressionToEvaluate = null
/**
 * positive test cases
 * function to check: validateExpression
 */

/** moment() evaluation */
test    (`expression "moment()" will give a valid parse tree`, () => {
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
test.only(`expression "moment('2011-10-21')" will give a valid parse tree`, () => {
    expect( evaluateExpression("moment('2011-10-21')") )   
    .toMatchObject(moment('2011-10-21'));
});

/** add a period should return new Date */
test.skip(`expression "addPeriod(moment('2010-03-01'),5,'days')" will give a valid date`, () => {
    expect( evaluateExpression("addPeriod(moment('2010-03-01'),5,'days')") )   
    //expect( evaluateExpression("moment('2010-03-06')") )   
    .toMatchObject(moment("2010-03-06"));
});

/** substract a period should return new Date */
test.skip(`expression "substractPeriod(moment('2010-03-31'),3,'days')" will give a valid date`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'days')") )   
    .toMatchObject(moment("2010-03-06"));
});

test(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())"))
    .toBe(true);
});

test(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))"))
    .toBe(true);
});

test.only(`isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))"))
    .toBe(true);
});

/** isBefore true */
test(`expression "isBefore('2010-01-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isBefore('2010-01-01', '2010-01-02')"))
    .toBe(true);
    //.toBeTruthy();
});

/** isBefore false */
test(`expression "isBefore('2010-02-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isBefore('2010-02-01', '2010-01-02')") )
    .not.toBe(true);
});

/** isAfter true */
test(`expression "isAfter('2010-03-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter('2010-03-01', '2010-01-02')"))
    .toBe(true);
});

/** isAfter true */
test.skip(`expression "isAfter([2010], '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter([2010], '2010-01-02')"))
    .toBe(true);
});

/** isAfter false */
test(`expression "isAfter('2010-01-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isAfter('2010-01-01', '2010-01-02')") )
    .not.toBe(true);
});

/** valid function with mixed parameters */
test(`expression "moment(1, "sample", isBefore(2))" will give a valid parse tree`, () => {
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
test(`expression "moment(1, isBefore(isTrue(5,5), 3))" will give a valid parse tree`, () => {
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
                type: "function",
                name: "isBefore",
                parameters: [
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


test(`expression "moment('2019-01-01 10:31:59')" is evaluated correctly`, () => {
    expect(evaluateExpression("moment('2019-01-01 10:31:59')"))
        .toMatchObject(moment('2019-01-01 10:31:59')) ;
});


test(`string subtree is evaluated correctly`, () => {
    let subTree = {
        type: 'string',
        value: 'aaaa'
    }
    expect(evaluateSubTree(subTree))
        .toBe('aaaa') ;
});

test(`number subtree is evaluated correctly`, () => {
    let subTree = {
        type: 'number',
        value: '1'
    }
    expect(evaluateSubTree(subTree))
        .toBe('1') ;
});

test(`array subtree is evaluated correctly`, () => {
    let subTree = [
        {
            type: 'number',
            value: '1'
        },
        {
            type: 'number',
            value: '2'
        },
    ]
    expect(evaluateSubTree(subTree))
        .toEqual(expect.arrayContaining(['1','2']));
});


/**
 * negative test cases
 */


/** passing empty input */
test(`empty expression should throw error`, () => {
    expect( () =>
        validateExpression("")
    )
    .toThrow( /^Expected function but/) ;
});

/** passing a null input */
test(`null expression should throw error`, () => {
    expect( () =>
        validateExpression() // null gives -> Cannot read property 'charAt' of null
    )
    //.toThrow();
    .toThrow("Cannot read property 'charAt' of undefined") ;
});

 /** pure string evaluation */
test(`a pure string expression will fail to parse`, () => {
    expect(() => {
        validateExpression("blahblahblah");
    }).toThrow(/^Expected function but/);
});

/** undefined function */
test(`expression "functionFour(a)" will throw an undefined`, () => {
    expect( ()=>
        validateExpression("functionFour('a')")
    )
    .toThrow("Undefined Function");
});

/** invalid function with parameters as array */
test(`expression "moment(1, [2, 3])" will throw an error like "Expected function but..."`, () => {
    let err=null;
    expect( () =>
        validateExpression("moment(1, [2, 3])")
    )
    .toThrow( /^Expected function but/) ;
    //err.toMatch(/^Expected function but/);
});

/** passing just a value makes an error */
test(`expression "stringValue" will throw an error like "Expected function but..."`, () => {
    let err=null;
    expect( () =>
        validateExpression("stringValue")
    )
    .toThrow( ) ;
});

/** passing invalid string */
test(`expression "moment(1, invalidString)" will throw error`, () => {
    expect( () =>
        validateExpression("moment(1, invalidString)")
    )
    .toThrow( /^Expected function but/) ;
});

/** isBefore 1 argument */
test.only(`expression "isBefore('2010-02-01')" should throw args missing error`, () => {
    expect( ()=> evaluateExpression("isBefore('2010-02-01')") )
    .toThrow("isBefore requires 2 moment() objects as arguments.");
});

/** isAfter 1 argument */
test.only(`expression "isAfter('2010-03-01')" should throw args missing error`, () => {
    expect( ()=> evaluateExpression("isAfter('2010-03-01')"))
    .toThrow("isAfter requires 2 moment() objects as arguments.");
});

test.only(`isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())"))
    .toBe(false);
});
//isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())

test.only(`expression "substractPeriod(moment('2010-03-31'),3,'dayss')" should throw invalid arg error`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'dayss')") )   
    .toMatchObject(moment("2010-03-06"));
});

