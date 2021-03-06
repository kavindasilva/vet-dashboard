import {validateExpression, evaluateSubTree, evaluateExpression} from "../src/common/newValidateRule"
//import moment from "../node_modules/moment/moment"

import moment from "moment";
let expressionToEvaluate = null
/**
 * function to check: validateExpression
 * function to check: evaluateExpression
 */

const sample_data_set1 = { ip_port: "2010-02-01", registration_sent_date:"2010-02-02", web_site: "www" }

/** moment() evaluation */
test.skip(`validateExpression "moment()" will give a valid parse tree`, () => { //console.log("newVal moment ", validateExpression("moment()"))
    expect( 
        validateExpression("moment()")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : []
    });
});

test.skip(`"moment()" should throw Expression should return only boolean value`, () => {
    expect( ()=> evaluateExpression("moment()") )
    .toThrow(/Expression should return only boolean value/)
}); 

/** vaild function with parameter */
test.skip(`"moment('2011-10-21')" will throw Expression should return only boolean value`, () => {
    expect( ()=> evaluateExpression("moment('2011-10-21')") )
    .toThrow(/Expression should return only boolean value/)
    //.toMatchObject(moment('2011-10-21'));
});

/** isAfter should return boolean on success */
test.skip(`typeof isAfter(moment('2010-03-01'), moment() )`, () => {
    //console.log(typeof  evaluateExpression("isAfter(moment('2010-03-01'), moment() )") )
    expect(typeof  evaluateExpression("isAfter(moment('2010-03-01'), moment() )") )
    .toEqual("boolean");
    //.toContain( false);
});

/** isBefore should return boolean on success */
test.skip(`typeof isBefore(moment('2010-03-01'), moment() )`, () => {
    expect(typeof  evaluateExpression("isBefore(moment('2010-03-01'), moment() )") )
    .toEqual("boolean");
});

/** add a period should return new Date --not working */
test.skip(`"addPeriod(moment('2010-03-01'),5,'days')" will give a valid date`, () => {
    expect( evaluateExpression("addPeriod(moment('2010-03-01'),5,'days')") )
    //console.log("R",r)
    //.toMatchObject( moment('2010-03-01').add(5,'d') )  //ok
    .toMatchObject(moment("2010-03-05").add(2,'days ')); // not equal
});

/** substract a period should return new Date */
test.skip(`"substractPeriod(moment('2010-03-31'),3,'days')" will give a valid date`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'days')") )   
    .toMatchObject(moment("2010-03-06"));
});

test.skip(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())"))
    .toBe(true);
    //toBeBoolean();
});

test.skip(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))"))
    .toBe(true);
});

test.skip(`isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))"))
    .toBe(true);
});

test.skip(`compare with current date: isAfter(addPeriod(moment(),5,'days'), moment())`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment(),5,'days'), moment())"))
    .toBe(true);
});

test.skip(`compare with current date: isBefore(substractPeriod(moment(),4,'days'), moment())`, () => {
    expect(evaluateExpression("isBefore(substractPeriod(moment(),4,'days'), moment())"))
    .toBe(true);
});

/** isBefore true */
test.skip(`"isBefore('2010-01-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isBefore('2010-01-01', '2010-01-02')"))
    .toBe(true);
    //.toBeTruthy();
});

/** isBefore false */
test.skip(`"isBefore('2010-02-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isBefore('2010-02-01', '2010-01-02')") )
    .not.toBe(true);
});

/** isAfter true */
test.skip(`"isAfter('2010-03-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter('2010-03-01', '2010-01-02')"))
    .toBe(true);
});

/** isAfter true */
test.skip(`"isAfter([2010], '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter([2010], '2010-01-02')"))
    .toBe(true);
});

/** isAfter false */
test.skip(`"isAfter('2010-01-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isAfter('2010-01-01', '2010-01-02')") )
    .not.toBe(true);
});

test.skip(`"moment('2019-01-01 10:31:59')" throws Expression should return only boolean value`, () => {
    expect( ()=> evaluateExpression("moment('2019-01-01 10:31:59')"))
    .toThrow(/Expression should return only boolean value/)
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

test(`AND operator 0 && 2 evaluated correctly: false`, () => {
    let subTree = {
        type: 'operator',
        name : "&&",
        operands : [
            {
                type: 'number',
                value: 0
            },
            {
                type: 'number',
                value: 2
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(false) ;
});
test(`AND operator "zero" && "" evaluated correctly: false`, () => {
    let subTree = {
        type: 'operator',
        name : "&&",
        operands : [
            {
                type: 'string',
                value: 'zero'
            },
            {
                type: 'string',
                value: ''
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(false) ;
});
test(`AND operator 4 && 2 evaluated correctly: true`, () => {
    let subTree = {
        type: 'operator',
        name : "&&",
        operands : [
            {
                type: 'number',
                value: 4
            },
            {
                type: 'number',
                value: 2
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(true) ;
});

test(`OR operator "one" || "" evaluated correctly: true`, () => {
    let subTree = {
        type: 'operator',
        name : "||",
        operands : [
            {
                type: 'string',
                value: 'one'
            },
            {
                type: 'string',
                value: ""
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(true) ;
});
test(`OR operator 0 || 5 evaluated correctly: true`, () => {
    let subTree = {
        type: 'operator',
        name : "||",
        operands : [
            {
                type: 'number',
                value: 0
            },
            {
                type: 'number',
                value: 5
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(true) ;
});
test(`OR operator 0 || 0 evaluated correctly: false`, () => {
    let subTree = {
        type: 'operator',
        name : "||",
        operands : [
            {
                type: 'number',
                value: 0
            },
            {
                type: 'number',
                value: 0
            }
        ]
    }
    expect(evaluateSubTree(subTree))
        .toBe(false) ;
});

test(`invalid operator throws exception`, () => {
    let subTree = {
        type: 'operator',
        name : "Invali",
        operands : [
            {
                type: 'number',
                value: 4
            },
            {
                type: 'number',
                value: 1
            }
        ]
    }
    expect( () => evaluateSubTree(subTree) )
        .toThrow(/^Unexpected operator/) ;
});

// test.only
test(`check not value of "1": false`, () => {
    let subTree = {
        type: 'function',
        name : "not",
        operands : [
            {
                type: 'string',
                value: "1"
            }
        ]
    }
    expect( evaluateSubTree(subTree) )
        .toBe(false);
})
test(`check not value of 0: true`, () => {
    let subTree = {
        type: 'function',
        name : "not",
        operands : [
            {
                type: 'number',
                value: 0
            }
        ]
    }
    expect( evaluateSubTree(subTree) )
        .toBe(true);
})
test(`check not value of false: true`, () => {
    let subTree = {
        type: 'function',
        name : "not",
        operands : [
            {
                type: 'boolean',
                value: false
            }
        ]
    }
    expect( evaluateSubTree(subTree) )
        .toBe(true);
})
test(`check not value of true: false`, () => {
    let subTree = {
        type: 'function',
        name : "not",
        operands : [
            {
                type: 'boolean',
                value: true
            }
        ]
    }
    expect( evaluateSubTree(subTree) )
        .toBe(false);
})
test(`not should get only 1 arg as params`, () => {
    let subTree = {
        type: 'function',
        name : "not",
        operands : [
            {
                type: 'boolean',
                value: true
            },
            {
                type: 'boolean',
                value: false
            }
        ]
    }
    expect( () => evaluateSubTree(subTree) )
        .toThrow(/not requires only one arg as params/);
})

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

test(`get field value: 2010-02-01`, () => {
    let subTree = {
        type: 'function',
        name : "eod",
        operands : [
            {
                type: 'field',
                name: 'ip_port'
            }
        ]
    }
    expect(evaluateSubTree(subTree, sample_data_set1))
        .toEqual("2010-02-01");
});

test(`get field value: empty field value list should throw an error`, () => {
    let subTree = {
        type: 'function',
        name : "eod",
        operands : [
            {
                type: 'field',
                name: 'ip_port'
            }
        ]
    }
    expect( () => evaluateSubTree(subTree, null))
        .toThrow(/field values list empty/);
});


// test(`isBefore: true`, () => {
//     let subTree = {
//         type: 'function',
//         name : "isBefore",
//         operands : [
//             {
//                 type: 'boolean',
//                 value: false
//             }
//         ]
//     }
//     expect( evaluateSubTree(subTree) )
//         .toBe(true);
// })

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
test(`expression "isBefore('2010-02-01')" should throw args missing error`, () => {
    expect( ()=> evaluateExpression({
        type: "function",
        name: "isBefore",
        operands: [
            {
                type: "string",
                value: '2010-02-01'
            }
        ]
    }) )
    .toThrow("isBefore requires 2 moment() objects as arguments.");
});

/** isAfter 1 argument */
test.skip(`expression "isAfter('2010-03-01')" should throw args missing error`, () => {
    expect( ()=> evaluateExpression("isAfter('2010-03-01')"))
    .toThrow("isAfter requires 2 moment() objects as arguments.");
});

test(`isAfter(addDays(moment('2010-03-01'),5,) throws Expression should return only boolean value`, () => {
    //expect(evaluateExpression("isAfter(addDays(moment('2010-03-01'),5,'days'), moment())"))
    expect( ()=> evaluateExpression({
        type: "function",
        name: "addDays",
        operands: [
            {
                type: "string",
                value: '2010-02-01'
            },
            {
                type: "number",
                value: '10'
            }
        ]
    }))
    .toThrow(/Expression should return only boolean value/);
});
//isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())

test.skip(`expression "substractPeriod(moment('2010-03-31'),3,'dayss')" should throw invalid arg error`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'dayss')") )   
    .toMatchObject(moment("2010-03-06"));
});

/** invalid date format passed */
test.skip(`expression "isBefore(addPeriod(moment('201003xw31'),3,'days'), moment())" should throw invalid date format error`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('201003xw31'),3,'days'), moment())") )   
    .toThrow(/Invalid date format/);
});

/** invalid date unit passed */
test.skip(`expression "isBefore(addPeriod(moment('2010-03-31'),3,'da'), moment())" should throw invalid date unit error(invalid unit)`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('2010-03-31'),3,'da'), moment())") )   
    .toThrow(/Undefined time unit/);
});

/** invalid date unit passed, case sensitive */
test.skip(`expression "isBefore(addPeriod(moment('2010-03-31'),3,'D'), moment())" should throw invalid date unit error(case sensitive)`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('2010-03-31'),3,'D'), moment())") )   
    .toThrow(/Undefined time unit/);
});

/** every function should return boolean on success. on failure error may thrown */
test.skip(`addPeriod(moment('2010-03-31'),3,'d') should not return boolean`, () => {
    expect( ()=> evaluateExpression("addPeriod(moment('2010-03-31'),3,'d')") )
    .toThrow();
});

test(`sample statement 1 with eranga [hardcoded peg]`, () => {
    let fieldValList = { registration_sent_date:"2015-05-01", ip_port: "2015-05-04" }
    let stmt1 = {
        type : "operator",
        name : "&&",
        operands : [
            {
                type : "operator",
                name : "&&",
                operands : [
                    {
                        type: "function",
                        name: "not",
                        operands: [
                            {
                                type: "function",
                                name: "isInvalid",
                                operands: [
                                    {
                                        type: "field",
                                        name: "ip_port"
                                    }
                                ]
                            }
                        ]
                        
                    },
                    {
                        type: "function",
                        name: "not",
                        operands: [
                            {
                                type: "function",
                                name: "isEmpty",
                                operands: [
                                    {
                                        type: "field",
                                        name: "registration_sent_date"
                                    }
                                ]
                            }
                        ]
    
                        
                    }
                ]
            },
            {
                type: "function",
                name: "isBefore",
                operands: [
                    {
                        type: "function",
                        name: "eod",
                        operands: [
                            {
                                type: "field",
                                name: "ip_port"
                            }
                        ]
                    },
                    {
                        type: "function",
                        name: "addDays",
                        operands: [
                            {
                                type: "function",
                                name: "eod",
                                operands: [
                                    {
                                        type: "field",
                                        name: "registration_sent_date"
                                    }
                                ]
                            },
                            {
                                type: "number",
                                value: 4
                            }
                        ]
                    }
                ]
                
            }
        ]
    }
    expect( evaluateExpression(stmt1, fieldValList) )
    .toBe(true);
})

test.only(`sample statement 2 for tickets [hardcoded peg]`, () => {
    let fieldValList = { registration_sent_date:"2015-05-01", ip_port: "2015-05-04" }
    // let stmt1 = JSON.parse('{ type : "operator", name : "&&", operands : [ { type : "operator", name : "&&", operands : [ { type: "function", name: "not", operands: [ { type: "function", name: "isInvalid", operands: [ { type: "field", name: "ip_port" } ] } ] }, { type: "function", name: "not", operands: [ { type: "function", name: "isEmpty", operands: [ { type: "field", name: "registration_sent_date" } ] } ]   } ] }, { type: "function", name: "isBefore", operands: [ { type: "function", name: "eod", operands: [ {   type: "field", name: "ip_port" } ] }, { type: "function", name: "addDays", operands: [ { type: "function", name: "eod", operands: [ { type: "field", name: "registration_sent_date" } ] }, { type: "number", value: 4 } ] } ]  }, ] } ')
    // let stmt1 = JSON.parse('{ "type" : "operator", "name" : "&&", "operands" : [ { "type" : "operator", "name" : "&&", "operands" : [ { "type": "function", "name": "not", "operands": [ { "type": "function", "name": "isInvalid", "operands": [ { "type": "field", "name": "ip_port" } ] } ] }, { "type": "function", "name": "not", "operands": [ { "type": "function", "name": "isEmpty", "operands": [ { "type": "field", "name": "registration_sent_date" } ] } ]   } ] }, { "type": "function", "name": "isBefore", "operands": [ { "type": "function", "name": "eod", "operands": [ {   "type": "field", "name": "ip_port" } ] }, { "type": "function", "name": "addDays", "operands": [ { "type": "function", "name": "eod", "operands": [ { "type": "field", "name": "registration_sent_date" } ] }, { "type": "number", "value": "4" } ] } ]  }, ] } ')

    let stmt1 = JSON.parse('{"type":"operator","name":"&&","operands":[{"type":"operator","name":"&&","operands":[{"type":"function","name":"not","operands":[{"type":"function","name":"isInvalid","operands":[{"type":"field","name":"ip_port"}]}]},{"type":"function","name":"not","operands":[{"type":"function","name":"isEmpty","operands":[{"type":"field","name":"registration_sent_date"}]}]}]},{"type":"function","name":"isBefore","operands":[{"type":"function","name":"eod","operands":[{"type":"field","name":"ip_port"}]},{"type":"function","name":"addDays","operands":[{"type":"function","name":"eod","operands":[{"type":"field","name":"registration_sent_date"}]},{"type":"number","value":4}]}]}]} ')
    // let stmt1 = {"type":"operator","name":"&&","operands":[{"type":"operator","name":"&&","operands":[{"type":"function","name":"not","operands":[{"type":"function","name":"isInvalid","operands":[{"type":"field","name":"ip_port"}]}]},{"type":"function","name":"not","operands":[{"type":"function","name":"isEmpty","operands":[{"type":"field","name":"registration_sent_date"}]}]}]},{"type":"function","name":"isBefore","operands":[{"type":"function","name":"eod","operands":[{"type":"field","name":"ip_port"}]},{"type":"function","name":"addDays","operands":[{"type":"function","name":"eod","operands":[{"type":"field","name":"registration_sent_date"}]},{"type":"number","value":4}]}]}]} 

    expect( evaluateExpression(stmt1, fieldValList) )
    .toBe(true);
})