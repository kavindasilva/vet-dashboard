import {sum, validateExpression} from "../src/common/validateRule"


test('a pure string expression will fail to parse', () => {
    expect(() => {
        validateExpression("blahblahblah");
    }).toThrow();
});


test('expression "undefinedFunction()" will throw an "Undefined Function" error', () => {
    expect(() => {
        validateExpression("undefinedFunction()");
    }).toThrow("Undefined Function");
});


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

// test('expression "myFunction(a)" will give a valid parse tree', () => {
//     expect(
//         validateExpression("myFunction('a')")
//     )
//     .toMatchObject({
//         type        : 'function',
//         name        : 'myFunction',
//         parameters  : [
//             {
//                 type: 'string',
//                 value: 'a'
//             }
//         ]
//     });
// });

