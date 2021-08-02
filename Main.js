// 順番、大事
const ssIdList =
    [
        "1yfK-8gVzbcSuaJHMD5w4g6ao-9FsyG8oD9BgvacHb1w", // 20までの足し算（くりあがり）
        "1sjskBbprhEyqvQzXXl7oTUNNAzk64WEGXRBVOofZC9U", // 10までの引き算
        "1KrL8Oqa27QOFD1ac5GGCux93Ylt1mp2Yv3IYxH5j6ys", // 20までの引き算（くりさがり）
    ];

function showPdfUrl() {
    const head = "https://docs.google.com/spreadsheets/d/";
    const end = "/export?format=pdf";
    for (let idx = 0; idx < ssIdList.length; idx++)
        console.log(head + ssIdList[idx] + end);
}

function updateAll() {
    for (let idx = 0; idx < ssIdList.length; idx++) {
        // シート
        const ss = SpreadsheetApp.openById(ssIdList[idx]);
        const sheet = ss.getSheetByName("Main");
        // 日付
        let date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        // --
        updateEach(sheet, month, day);
    }
}

function updateEach(sheet, month, day) {
    // 日付の記入
    sheet.getRange(1, 2).setValue(month);
    sheet.getRange(1, 4).setValue(day);

    let list = [];
    while (list.length <= 30) {
        var subject = new Object();
        subject.idx = list.length;
        subject.a = Math.floor(Math.random() * 9) + 10; // 10 - 18
        subject.b = Math.floor(Math.random() * 7) + 3; // 3 - 9
        subject.addMode = false; // ひきざん

        // 検査
        let chk = subject.a - subject.b;
        if (0 < chk && chk < 10)
            list.push(subject);
    }

    console.log(list);
    // return;

    for (let idx = 0; idx < 15; idx++) {
        var row = (2 * idx) + 3;

        var range = sheet.getRange(row, 2, 1, 5);
        var values = range.getValues();

        values[0] = createSubject(list[idx]);

        range.setValues(values);

        console.log(idx);
    }

    for (let idx = 15; idx < 30; idx++) {
        var row = (2 * (idx - 15)) + 3;

        var range = sheet.getRange(row, 13, 1, 5);
        var values = range.getValues();

        values[0] = createSubject(list[idx]);

        range.setValues(values);

        console.log(idx);
    }

    console.log("Done");

}

function createSubject(subject) {
    let list = [];
    list[0] = "'(" + (subject.idx + 1) + ")";
    list[1] = subject.a;
    list[2] = subject.addMode ? "+" : "-";
    list[3] = subject.b;
    list[4] = "'=";
    return list;
}
