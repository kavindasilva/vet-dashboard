function countOnBGColor(range, colorref) {
    var sheet = SpreadsheetApp.getActiveSheet();
    var color = sheet.getRange(colorref)
        .getBackground();
    var range = sheet.getRange(range);
    var rangeVal = range.getValues();
    var count = 0;
    var allColors = range.getBackgrounds();
    for (var i = 0; i < allColors.length; i++) {
        for (var j = 0; j < allColors[0].length; j++) {
            if (allColors[i][j] == color) count += 1;
        };
    };
    return count;
}
function lastValue(column) {
    var lastRow = SpreadsheetApp.getActiveSheet().getMaxRows();
    var values = SpreadsheetApp.getActiveSheet().getRange(column + "1:" + column + lastRow).getValues();
    for (; values[lastRow - 1] == "" && lastRow > 0; lastRow--) { }
    return values[lastRow - 1];
}