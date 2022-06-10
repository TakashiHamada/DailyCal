// --
// 個別実行用
// --
function test_updateOne() {
    const idx = 20; // <= param
    // シート
    const ss = SpreadsheetApp.openById(ssIdList[idx]);
    const sheet = ss.getSheetByName("Main");
    // 日付
    let date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // --
    updateEach(idx, sheet, month, day);
}

// --
// PDF出力先の表示
// --
function test_showPdfUrl() {
    const head = "https://docs.google.com/spreadsheets/d/";
    const end = "/export?format=pdf";
    for (let idx = 0; idx < ssIdList.length; idx++)
        console.log(head + ssIdList[idx] + end);
}
