var email_address = "support@xxx.com"
var clinic_cell = searchColumns("hospital");
var website_cell = searchColumns("website");
var email_cell = searchColumns("HM email address");
var ip_cell = searchColumns("ip and port(date)=> helpdesk");
var install_api_cell = searchColumns("install api(date)=> ashley or vetstoria");
var registration_cell = searchColumns("registration form completed");
var setup_form_cell = searchColumns("set-up formcompleted");
var to_do = "";
var pending = "";
var overdue = "";
function checkEdits() {
    body = "";
    //trigger 1
    try {
        var ss = SpreadsheetApp.getActiveSheet();
        var active_cell = ss.getActiveCell().getA1Notation();
        var bool1 = active_cell.substring(0, 1) == clinic_cell;
        var bool2 = active_cell.substring(0, 1) == website_cell;
        var bool6 = active_cell.substring(0, 1) == email_cell;
        var bool3 = ss.getRange(clinic_cell + active_cell.substring(1)).getValue() != null && ss.getRange(clinic_cell + active_cell.substring(1)).getValue() != "";
        var bool4 = ss.getRange(website_cell + active_cell.substring(1)).getValue() != null && ss.getRange(website_cell + active_cell.substring(1)).getValue() != "";
        var bool5 = ss.getRange(email_cell + active_cell.substring(1)).getValue() != null && ss.getRange(email_cell + active_cell.substring(1)).getValue() != "";
        if ((bool1 || bool2 || bool6) && bool3 && bool4 && bool5) {
            row = active_cell.substring(1);
            body += "Cell " + active_cell + " edited by " + Session.getActiveUser().getEmail() + "\nPlease register " + SpreadsheetApp.getActive().getSheets()[0].getRange(clinic_cell + row).getValue() + "\n";
        }
    }
    catch (e) {
        Logger.log(e);
    }
    //trigger 2
    try {
        var ss = SpreadsheetApp.getActiveSheet();
        var active_cell = ss.getActiveCell().getA1Notation();
        var bool1 = active_cell.substring(0, 1) == ip_cell;
        var bool2 = active_cell.substring(0, 1) == install_api_cell;
        var bool3 = ss.getRange(ip_cell, active_cell.substring(1)).getValue() != null && ss.getRange(ip_cell, active_cell.substring(1)).getValue() != "";
        var bool4 = ss.getRange(install_api_cell, active_cell.substring(1)).getValue() != null && ss.getRange(install_api_cell, active_cell.substring(1)).getValue() != "";
        if ((bool1 || bool2) && bool3 && bool4) {
            row = active_cell.substring(1);
            body += "Cell " + active_cell + " edited by " + Session.getActiveUser().getEmail() + "\nConfigure api for " + SpreadsheetApp.getActive().getSheets()[0].getRange(clinic_cell + row).getValue() + "\n";
        }
    }
    catch (e) {
        Logger.log(e);
    }
    //trigger 3
    try {
        var ss = SpreadsheetApp.getActiveSheet();
        var active_cell = ss.getActiveCell().getA1Notation();
        var bool1 = active_cell.substring(0, 1) == ip_cell;
        var bool2 = active_cell.substring(0, 1) == install_api_cell;
        var bool3 = active_cell.substring(0, 1) == registration_cell;
        var bool4 = active_cell.substring(0, 1) == setup_form_cell;
        var bool5 = ss.getRange(ip_cell, active_cell.substring(1)).getValue() != null && ss.getRange(ip_cell, active_cell.substring(1)).getValue() != "";
        var bool6 = ss.getRange(install_api_cell, active_cell.substring(1)).getValue() != null && ss.getRange(install_api_cell, active_cell.substring(1)).getValue() != "";
        var bool7 = ss.getRange(registration_cell, active_cell.substring(1)).getValue() != null && ss.getRange(registration_cell, active_cell.substring(1)).getValue() != "";
        var bool8 = ss.getRange(setup_form_cell, active_cell.substring(1)).getValue() != null && ss.getRange(setup_form_cell, active_cell.substring(1)).getValue() != "";
        if ((bool1 || bool2 || bool3 || bool4) && bool5 && bool6 && bool7 && bool8) {
            row = active_cell.substring(1);
            body += "Cell " + active_cell + " edited by " + Session.getActiveUser().getEmail() + "\nSend out booking link for testing for " + SpreadsheetApp.getActive().getSheets()[0].getRange(clinic_cell + row).getValue() + "\n";
        }
    }
    catch (e) {
        Logger.log(e);
    }
    if (body != "" && body != null) {
        sendEmail(body);
    }
}
function sendEmail(body) {
    GmailApp.sendEmail(email_address, "Spreadsheet Update from NVA " + new Date(), body);
}
function getDate() {
    return Utilities.formatDate(new Date(), "GMT+5:30", "dd/MM/yyyy");
}
function getTime() {
    return Utilities.formatDate(new Date(), "GMT+5:30", "hh:mm a");
}
function send() {
    var body = "<br>Date - " + getDate() + "<br><br>ToDo<br>-----------------------<br><p style='background-color:#3cad3a'>" + to_do + "</p><br>Needs Attention<br>-----------------------<br><p style='background-color:#fc8f00'>" + pending + "</p><br>Overdue<br>-----------------------<br><p style='background-color:#ff6528'>" + overdue + "</p>";
    sendReport(body);
    Logger.log(body);
    to_do = "";
    pending = "";
    overdue = "";
}
function compareDates(s_date, e_date) {
    var s_day = s_date.substring(0, 2);
    var s_month = s_date.substring(3, 5);
    var s_year = s_date.substring(6);
    var e_day = e_date.substring(0, 2);
    var e_month = e_date.substring(3, 5);
    var e_year = e_date.substring(6);
    if (s_year < e_year) {
        return true;
    } else if (s_year == e_year) {
        if (s_month < e_month) {
            return true;
        } else if (s_month == e_month) {
            if (s_day < e_day) {
                return true;
            } else if (s_day == e_day) {
                return "equal";
            }
        }
    }
    return false;
}
function sendReport(body) {
    MailApp.sendEmail({
        to: email_address,
        subject: "Spreadsheet Update " + new Date(),
        htmlBody: body
    });
}
function searchColumns(search_term) {
    var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var ss = SpreadsheetApp.getActive().getSheets()[0];
    search_term = filter(search_term, "\n");
    for (var i = 0; i < alphabets.length; i++) {
        var val = ss.getRange(alphabets[i] + "1").getValue().toLowerCase();
        val = filter(val, "\n");
        if (search_term == val.substring(0, search_term.length)) {
            return alphabets[i];
        }
    }
}
function filter(main, sub) {
    main = main.split(sub);
    var fmain = "";
    for (var i = 0; i < main.length; i++) {
        fmain += main[i];
    }
    return fmain.toLowerCase();
}
function demo() {
    Logger.log(ip_cell);
    Logger.log(install_api_cell);
    Logger.log(registration_cell);
    Logger.log(setup_form_cell);
}