
/** Output from Peg.JS */

g: [
    {ip_port}.isInvalid().not() &&
    {registration_sent_date}.isEmpty().not() && 
    {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(4))
];

dg_parsed: {
    type : "operator",
    name : "&&",
    operands : [
        {
            type : "operator",
            name : "&&",
            operands : [
                //{ip_port}.isInvalid().not()
                {
                    type: "function",
                    name: "not",
                    operands: [
                        //{ip_port}.isInvalid()
                        {
                            type: "function",
                            name: "isInvalid",
                            operands: [
                                //{ip_port}
                                {
                                    type: "field",
                                    name: "ip_port"
                                }
                            ]
                        }
                    ]
                    
                },
                //{registration_sent_date}.isEmpty().not()
                {
                    type: "function",
                    name: "not",
                    operands: [
                        //{registration_sent_date}.isEmpty()
                        {
                            type: "function",
                            name: "isEmpty",
                            operands: [
                                //{registration_sent_date}
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
        //{ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(4))
        {
            type: "function",
            name: "isBefore",
            operands: [
                //{ip_port}.eod()
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
                //{registration_sent_date}.eod().addDays(4)
                {
                    type: "function",
                    name: "addDays",
                    operands: [
                        //{registration_sent_date}.eod()
                        {
                            type: "function",
                            name: "eod",
                            operands: [
                                //{registration_sent_date}
                                {
                                    type: "field",
                                    name: "registration_sent_date"
                                }
                            ]
                        },
                        //4
                        {
                            type: "number",
                            value: 4
                        }
                    ]
                }
            ]
            
        },
    ]
}