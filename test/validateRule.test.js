import {validateExpression, evaluateSubTree, evaluateExpression} from "../src/common/validateRule"
//import moment from "../node_modules/moment/moment"

import moment from "moment";
let expressionToEvaluate = null
/**
 * function to check: validateExpression
 * function to check: evaluateExpression
 */

/** moment() evaluation */
test(`validateExpression "moment()" will give a valid parse tree`, () => {
    expect( 
        validateExpression("moment()")
    )
    .toMatchObject({
        type        : 'function',
        name        : 'moment',
        parameters  : []
    });
});

test(`"moment()" should throw Expression should return only boolean value`, () => {
    expect( ()=> evaluateExpression("moment()") )
    .toThrow(/Expression should return only boolean value/)
}); 

/** vaild function with parameter */
test(`"moment('2011-10-21')" will throw Expression should return only boolean value`, () => {
    expect( ()=> evaluateExpression("moment('2011-10-21')") )
    .toThrow(/Expression should return only boolean value/)
    //.toMatchObject(moment('2011-10-21'));
});

/** isAfter should return boolean on success */
test(`typeof isAfter(moment('2010-03-01'), moment() )`, () => {
    //if(APP_MODE==="DEBUG")console.log(typeof  evaluateExpression("isAfter(moment('2010-03-01'), moment() )") )
    expect(typeof  evaluateExpression("isAfter(moment('2010-03-01'), moment() )") )
    .toEqual("boolean");
    //.toContain( false);
});

/** isBefore should return boolean on success */
test(`typeof isBefore(moment('2010-03-01'), moment() )`, () => {
    expect(typeof  evaluateExpression("isBefore(moment('2010-03-01'), moment() )") )
    .toEqual("boolean");
});

/** add a period should return new Date --not working */
test.skip(`"addPeriod(moment('2010-03-01'),5,'days')" will give a valid date`, () => {
    expect( evaluateExpression("addPeriod(moment('2010-03-01'),5,'days')") )
    //if(APP_MODE==="DEBUG")console.log("R",r)
    //.toMatchObject( moment('2010-03-01').add(5,'d') )  //ok
    .toMatchObject(moment("2010-03-05").add(2,'days ')); // not equal
});

/** substract a period should return new Date */
test.skip(`"substractPeriod(moment('2010-03-31'),3,'days')" will give a valid date`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'days')") )   
    .toMatchObject(moment("2010-03-06"));
});

test(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment())"))
    .toBe(true);
    //toBeBoolean();
});

test(`isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))`, () => {
    expect(evaluateExpression("isBefore(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-10'))"))
    .toBe(true);
});

test(`isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment('2010-03-05'))"))
    .toBe(true);
});

test(`compare with current date: isAfter(addPeriod(moment(),5,'days'), moment())`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment(),5,'days'), moment())"))
    .toBe(true);
});

test(`compare with current date: isBefore(substractPeriod(moment(),4,'days'), moment())`, () => {
    expect(evaluateExpression("isBefore(substractPeriod(moment(),4,'days'), moment())"))
    .toBe(true);
});

/** isBefore true */
test(`"isBefore('2010-01-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isBefore('2010-01-01', '2010-01-02')"))
    .toBe(true);
    //.toBeTruthy();
});

/** isBefore false */
test(`"isBefore('2010-02-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isBefore('2010-02-01', '2010-01-02')") )
    .not.toBe(true);
});

/** isAfter true */
test(`"isAfter('2010-03-01', '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter('2010-03-01', '2010-01-02')"))
    .toBe(true);
});

/** isAfter true */
test.skip(`"isAfter([2010], '2010-01-02')" should return true`, () => {
    expect( evaluateExpression("isAfter([2010], '2010-01-02')"))
    .toBe(true);
});

/** isAfter false */
test(`"isAfter('2010-01-01', '2010-01-02')" should return false`, () => {
    expect( evaluateExpression("isAfter('2010-01-01', '2010-01-02')") )
    .not.toBe(true);
});

test(`"moment('2019-01-01 10:31:59')" throws Expression should return only boolean value`, () => {
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
    expect( ()=> evaluateExpression("isBefore('2010-02-01')") )
    .toThrow("isBefore requires 2 moment() objects as arguments.");
});

/** isAfter 1 argument */
test(`expression "isAfter('2010-03-01')" should throw args missing error`, () => {
    expect( ()=> evaluateExpression("isAfter('2010-03-01')"))
    .toThrow("isAfter requires 2 moment() objects as arguments.");
});

test(`isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())`, () => {
    expect(evaluateExpression("isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())"))
    .toBe(false);
});
//isAfter(addPeriod(moment('2010-03-01'),5,'days'), moment())

test.skip(`expression "substractPeriod(moment('2010-03-31'),3,'dayss')" should throw invalid arg error`, () => {
    expect( evaluateExpression("substractPeriod(moment('2010-03-31'),3,'dayss')") )   
    .toMatchObject(moment("2010-03-06"));
});

/** invalid date format passed */
test(`expression "isBefore(addPeriod(moment('201003xw31'),3,'days'), moment())" should throw invalid date format error`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('201003xw31'),3,'days'), moment())") )   
    .toThrow(/Invalid date format/);
});

/** invalid date unit passed */
test(`expression "isBefore(addPeriod(moment('2010-03-31'),3,'da'), moment())" should throw invalid date unit error(invalid unit)`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('2010-03-31'),3,'da'), moment())") )   
    .toThrow(/Undefined time unit/);
});

/** invalid date unit passed, case sensitive */
test(`expression "isBefore(addPeriod(moment('2010-03-31'),3,'D'), moment())" should throw invalid date unit error(case sensitive)`, () => {
    expect( ()=> evaluateExpression("isBefore(addPeriod(moment('2010-03-31'),3,'D'), moment())") )   
    .toThrow(/Undefined time unit/);
});

/** every function should return boolean on success. on failure error may thrown */
test(`addPeriod(moment('2010-03-31'),3,'d') should not return boolean`, () => {
    expect( ()=> evaluateExpression("addPeriod(moment('2010-03-31'),3,'d')") )
    .toThrow();
});

