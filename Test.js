// --
// 個別実行用
// --
function test_UpdateOne() {
    const idx = 0; // <= param
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
