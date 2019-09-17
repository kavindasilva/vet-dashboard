
rules = [
    {
        label: "Registration Invite sent",
        name : "registration_sent_date",

        g: [
            {ip_port}.invalid().not() &&
            {registration_sent_date}.empty().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(4))
        ],

        green: and( 
            not( empty( valueOf("ip_port") ) ), 
            isBefore(
                addPeriod( eod( valueOf("registration_sent_date") ), 4, "days"  ),
                eod( valueOf("ip_port") ) 
            )
        ),
        a: [ 
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid() && 
            eodToday().isBefore({registration_sent_date}.eod().addDays(7)) 
        ] || [ 
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(7))
        ],
        amber: or(
            and(
                empty( valueOf("ip_port") ),
                isBefore(
                    addPeriod( eod( valueOf("registration_sent_date") ), 7, "days"  ),
                    eodToday() 
                )
            ),
            and(
                not( empty( valueOf("ip_port") ) ),
                isBefore(
                    addPeriod( eod( valueOf("registration_sent_date") ), 7, "days"  ),
                    eod( valueOf("ip_port") ) 
                )
            )
        ),
        r:[
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid() && 
            eodToday().isAfter({registration_sent_date}.eod().addDays(7)) 
        ] || [
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid().not() && 
            {ip_port}.eod().isAfter({registration_sent_date}.eod().addDays(7)) 
        ],
        red: or(
            and(
                empty( valueOf("ip_port") ),
                isBefore(
                    addPeriod( eod( valueOf("registration_sent_date") ), 7, "days"  ),
                    eodToday() 
                )
            ),
            and(
                not( empty( valueOf("ip_port") ) ),
                isAfter(
                    addPeriod( eod( valueOf("registration_sent_date") ), 7, "days"  ),
                    eod( valueOf("ip_port") ) 
                )
            )
        )           
    },
    {
        label: "IP & Port",
        name : "ip_port",

        g: [
            {ip_port}.invalid().not() &&
            {registration_sent_date}.empty().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(4))
        ],

        a: [ 
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid() && 
            eodToday().isBefore({registration_sent_date}.eod().addDays(7)) 
        ] || [ 
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(7))
        ],

        r:[
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid() && 
            eodToday().isAfter({registration_sent_date}.eod().addDays(7)) 
        ] || [
            {registration_sent_date}.invalid().not() &&
            {ip_port}.invalid().not() && 
            {ip_port}.eod().isAfter({registration_sent_date}.eod().addDays(7)) 
        ]          
    },

    {
        label: "Install API",
        name : "install_api",

        g: [
            {install_api}.invalid().not() &&
            {ip_port}.empty().not() && 
            {ip_port}.eod().isBefore({ip_port}.eod().addDays(4))
        ],

        a: [ 
            {ip_port}.invalid().not() &&
            {install_api}.invalid() && 
            eodToday().isBefore({ip_port}.eod().addDays(7)) 
        ] || [ 
            {ip_port}.invalid().not() &&
            {install_api}.invalid().not() && 
            {install_api}.eod().isBefore({ip_port}.eod().addDays(7))
        ],

        r:[
            {ip_port}.invalid().not() &&
            {install_api}.invalid() && 
            eodToday().isAfter({ip_port}.eod().addDays(7)) 
        ] || [
            {ip_port}.invalid().not() &&
            {install_api}.invalid().not() && 
            {install_api}.eod().isAfter({ip_port}.eod().addDays(7)) 
        ]          
    },
    {
        label: "Reg form completed",
        name : "reg_form_completed",

        g: [
            {reg_form_completed}.invalid().not() &&
            {registration_sent_date}.empty().not() && 
            {reg_form_completed}.eod().isBefore({registration_sent_date}.eod().addDays(7))
        ],

        a: [ 
            {install_api}.invalid().not() &&
            {reg_form_completed}.invalid() && 
            eodToday().isBefore({install_api}.eod().addDays(7)) 
        ] || [ 
            {install_api}.invalid().not() &&
            {reg_form_completed}.invalid().not() && 
            {reg_form_completed}.eod().isBefore({install_api}.eod().addDays(7))
        ],

        r:[
            {install_api}.invalid().not() &&
            {reg_form_completed}.invalid() && 
            eodToday().isAfter({install_api}.eod().addDays(7)) 
        ] || [
            {install_api}.invalid().not() &&
            {reg_form_completed}.invalid().not() && 
            {reg_form_completed}.eod().isAfter({install_api}.eod().addDays(7)) 
        ]          
    },

    {
        label: "Setup form completed",
        name : "setup_form_completed",

        g: [
            {setup_form_completed}.invalid().not() &&
            {registration_sent_date}.empty().not() && 
            {setup_form_completed}.eod().isBefore({registration_sent_date}.eod().addDays(7))
        ],

        a: [ 
            {reg_form_completed}.invalid().not() &&
            {setup_form_completed}.invalid() && 
            eodToday().isBefore({reg_form_completed}.eod().addDays(7)) 
        ] || [ 
            {reg_form_completed}.invalid().not() &&
            {setup_form_completed}.invalid().not() && 
            {setup_form_completed}.eod().isBefore({reg_form_completed}.eod().addDays(7))
        ],

        r:[
            {reg_form_completed}.invalid().not() &&
            {setup_form_completed}.invalid() && 
            eodToday().isAfter({reg_form_completed}.eod().addDays(7)) 
        ] || [
            {reg_form_completed}.invalid().not() &&
            {setup_form_completed}.invalid().not() && 
            {setup_form_completed}.eod().isAfter({reg_form_completed}.eod().addDays(7)) 
        ]          
    },
    {
        label: "API conn status",
        name : "api_conn_status",

        g: [
            {ip_port}.invalid().not(000000) &&
            {registration_sent_date}.empty().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(1))
        ],

        a: [ 
            {setup_form_completed}.invalid().not() &&
            {api_conn_status}.invalid() && 
            eodToday().isBefore({setup_form_completed}.eod().addDays(7)) 
        ] || [ 
            {setup_form_completed}.invalid().not() &&
            {api_conn_status}.invalid().not() && 
            {api_conn_status}.eod().isBefore({setup_form_completed}.eod().addDays(7))
        ],

        r:[
            {setup_form_completed}.invalid().not() &&
            {api_conn_status}.invalid() && 
            eodToday().isAfter({setup_form_completed}.eod().addDays(7)) 
        ] || [
            {setup_form_completed}.invalid().not() &&
            {api_conn_status}.invalid().not() && 
            {api_conn_status}.eod().isAfter({setup_form_completed}.eod().addDays(7)) 
        ]          
    },

    {
        label: "Booking link sent for testing",
        name : "booking_link_sent_date",

        g: [
            {ip_port}.invalid().not(000000) &&
            {registration_sent_date}.empty().not() && 
            {ip_port}.eod().isBefore({registration_sent_date}.eod().addDays(1))
        ],

        a: [ 
            {api_conn_status}.invalid().not() &&
            {booking_link_sent_date}.invalid() && 
            eodToday().isBefore({api_conn_status}.eod().addDays(7)) 
        ] || [ 
            {api_conn_status}.invalid().not() &&
            {booking_link_sent_date}.invalid().not() && 
            {booking_link_sent_date}.eod().isBefore({api_conn_status}.eod().addDays(7))
        ],

        r:[
            {api_conn_status}.invalid().not() &&
            {booking_link_sent_date}.invalid() && 
            eodToday().isAfter({api_conn_status}.eod().addDays(7)) 
        ] || [
            {api_conn_status}.invalid().not() &&
            {booking_link_sent_date}.invalid().not() && 
            {booking_link_sent_date}.eod().isAfter({api_conn_status}.eod().addDays(7)) 
        ]          
    },
    {
        label: "Account handover agreed",
        name : "account_ho_agreed",

        g: [
            {account_ho_agreed}.invalid().not() &&
            {booking_link_sent_date}.empty().not() && 
            {account_ho_agreed}.eod().isBefore({booking_link_sent_date}.eod().addDays(7))
        ],

        a: [ 
            {booking_link_sent_date}.invalid().not() &&
            {account_ho_agreed}.invalid() && 
            eodToday().isBefore({booking_link_sent_date}.eod().addDays(7)) 
        ] || [ 
            {booking_link_sent_date}.invalid().not() &&
            {account_ho_agreed}.invalid().not() && 
            {account_ho_agreed}.eod().isBefore({booking_link_sent_date}.eod().addDays(7))
        ],

        r:[
            {booking_link_sent_date}.invalid().not() &&
            {account_ho_agreed}.invalid() && 
            eodToday().isAfter({booking_link_sent_date}.eod().addDays(7)) 
        ] || [
            {booking_link_sent_date}.invalid().not() &&
            {account_ho_agreed}.invalid().not() && 
            {account_ho_agreed}.eod().isAfter({booking_link_sent_date}.eod().addDays(7)) 
        ]          
    },

    {
        label: "Approved client live date",
        name : "approved_client_live",

        g: [
            {approved_client_live}.invalid().not() &&
            {account_ho_agreed}.empty().not() && 
            {approved_client_live}.eod().isBefore({account_ho_agreed}.eod().addDays(7))
        ],

        a: [ 
            {account_ho_agreed}.invalid().not() &&
            {approved_client_live}.invalid() && 
            eodToday().isBefore({account_ho_agreed}.eod().addDays(7)) 
        ] || [ 
            {account_ho_agreed}.invalid().not() &&
            {approved_client_live}.invalid().not() && 
            {approved_client_live}.eod().isBefore({account_ho_agreed}.eod().addDays(7))
        ],

        r:[
            {account_ho_agreed}.invalid().not() &&
            {approved_client_live}.invalid() && 
            eodToday().isAfter({account_ho_agreed}.eod().addDays(7)) 
        ] || [
            {account_ho_agreed}.invalid().not() &&
            {approved_client_live}.invalid().not() && 
            {approved_client_live}.eod().isAfter({account_ho_agreed}.eod().addDays(7)) 
        ]          
    },
    {
        label: "Widget live date",
        name : "widget_live_date",

        g: [
            {ip_port}.invalid().not()
        ],

        a: [ 
            {approved_client_live}.invalid().not() &&
            {widget_live_date}.invalid() && 
            eodToday().isBefore({approved_client_live}.eod().addDays(7)) 
        ] || [ 
            {approved_client_live}.invalid().not() &&
            {widget_live_date}.invalid().not() && 
            {widget_live_date}.eod().isBefore({approved_client_live}.eod().addDays(7))
        ],

        r:[
            {approved_client_live}.invalid().not() &&
            {widget_live_date}.invalid() && 
            eodToday().isAfter({approved_client_live}.eod().addDays(7)) 
        ] || [
            {approved_client_live}.invalid().not() &&
            {widget_live_date}.invalid().not() && 
            {widget_live_date}.eod().isAfter({approved_client_live}.eod().addDays(7)) 
        ]          
    },

    {
        label: "Vetstreet live date",
        name : "vetstreet_live_date",

        g: [
            {widget_live_date}.invalid().not() &&
            {vetstreet_live_date}.eod().isBefore({widget_live_date}.getNext("Tuesday").eod())
        ],

        a: [ 
            {widget_live_date}.invalid().not() &&
            {vetstreet_live_date}.invalid() && 
            eodToday().isBefore({widget_live_date}.eod().addDays(7)) 
        ] || [ 
            {widget_live_date}.invalid().not() &&
            {vetstreet_live_date}.invalid().not() && 
            {vetstreet_live_date}.eod().isBefore({widget_live_date}.eod().addDays(7))
        ],

        r:[
            {widget_live_date}.invalid().not() &&
            {vetstreet_live_date}.invalid() && 
            eodToday().isAfter({widget_live_date}.eod().addDays(7)) 
        ] || [
            {widget_live_date}.invalid().not() &&
            {vetstreet_live_date}.invalid().not() && 
            {vetstreet_live_date}.eod().isAfter({widget_live_date}.eod().addDays(7)) 
        ]          
    },
    {
        label: "FB live date",
        name : "fb_live_date",

        g: [
            {fb_live_date}.invalid().not(0) &&
            {widget_live_date}.empty().not() && 
            {fb_live_date}.eod().isAfter({widget_live_date})
        ],

        a: [ 
            {vetstreet_live_date}.invalid().not() &&
            {fb_live_date}.invalid() && 
            eodToday().isBefore({vetstreet_live_date}.eod().addDays(7)) 
        ] || [ 
            {vetstreet_live_date}.invalid().not() &&
            {fb_live_date}.invalid().not() && 
            {fb_live_date}.eod().isBefore({vetstreet_live_date}.eod().addDays(7))
        ],

        r:[
            {vetstreet_live_date}.invalid().not() &&
            {fb_live_date}.invalid() && 
            eodToday().isAfter({vetstreet_live_date}.eod().addDays(7)) 
        ] || [
            {vetstreet_live_date}.invalid().not() &&
            {fb_live_date}.invalid().not() && 
            {fb_live_date}.eod().isAfter({vetstreet_live_date}.eod().addDays(7)) 
        ]          
    },
    {
        label: "IPs primary",
        name : "ips_primary",

        g: [
            {ips_primary}.invalid().not(0) &&
            {reg_form_completed}.empty().not() && 
            {ips_primary}.eod().isEqual({reg_form_completed}.eod())
        ],

        a: [ 
            {reg_form_completed}.invalid().not() &&
            {ips_primary}.invalid() && 
            eodToday().isBefore({reg_form_completed}.eod().addDays(7)) 
        ] || [ 
            {reg_form_completed}.invalid().not() &&
            {ips_primary}.invalid().not() && 
            {ips_primary}.eod().isBefore({reg_form_completed}.eod().addDays(7))
        ],

        r:[
            {reg_form_completed}.invalid().not() &&
            {ips_primary}.invalid() && 
            eodToday().isAfter({reg_form_completed}.eod().addDays(7)) 
        ] || [
            {reg_form_completed}.invalid().not() &&
            {ips_primary}.invalid().not() && 
            {ips_primary}.eod().isAfter({reg_form_completed}.eod().addDays(7)) 
        ]          
    }
];


x = {
    g: [
        {widget_live_date}.invalid().not() &&
        {vetstreet_live_date}.eod().isBefore({widget_live_date}.getNext("Tuesday").eod())
    ]

};