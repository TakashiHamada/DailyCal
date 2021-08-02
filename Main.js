// 順番、大事
const ssIdList =
    [
        "1GXpdCMm5G8sgu3rNMvMqTBAn-s96g9MvUzDB8FBaOnQ", // 10までの足し算
        "19dqrMTa38sd1caYH2-gCPDDQ4JRdqtggWc_YUrt_j4c", // 20までの足し算（１０といくつ）
        "1yfK-8gVzbcSuaJHMD5w4g6ao-9FsyG8oD9BgvacHb1w", // 20までの足し算（くりあがり）
        "1EfaNzVGKX8Vy43UHlZ4hbwPOYP7ERTvjn6_84lOY5zo", // 10単位の簡単な足し算
        "1h1_nc2--ayjRlILLUWAq_KnB4Q7Gii3LlV6r6bOB2bY", // 100までの足し算（何＋何）＋（何）
        "1sjskBbprhEyqvQzXXl7oTUNNAzk64WEGXRBVOofZC9U", // 10までの引き算
        "1KrL8Oqa27QOFD1ac5GGCux93Ylt1mp2Yv3IYxH5j6ys", // 20までの引き算（くりさがり）
        "1f6lc5qAtW8g0XjNtlYSZGYH9lasusYJhyFdTb821sX0", // 100までの引き算（何＋何）ー（何）
        "1RYkj22xGcLHgVcWH4xnGBBVzQbvEGkkxYaDXzdzk9Mc", // 100までの引き算（１０単位の簡単な引き算）
    ];

// --
// PDF出力先の表示
// --
function showPdfUrl() {
    const head = "https://docs.google.com/spreadsheets/d/";
    const end = "/export?format=pdf";
    for (let idx = 0; idx < ssIdList.length; idx++)
        console.log(head + ssIdList[idx] + end);
}

// --
// 更新, トリガーで指定すること
// --
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
        updateEach(idx, sheet, month, day);
    }
    
    console.log("Done");
}

// --
// 個別実行用
// --
function updateOne() {
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

function updateEach(type, sheet, month, day) {
    // 日付の記入
    sheet.getRange(1, 2).setValue(month);
    sheet.getRange(1, 4).setValue(day);

    let list = [];
    while (list.length <= 30) {
        let subject = getSubjectByType(type);
        // 検査に不合格な場合もあるので
        if (subject !== null) {
            subject.idx = list.length; // idxを、むりやり挿入
            list.push(subject);
        }
    }

    console.log(list);
    
    write(sheet, list, "LeftCol");
    write(sheet, list, "RightCol");
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

// 書き込み用
function write(sheet, list, mode) {
    // 注意, 1行ずつの書き込みは遅いので、増えた場合は一括にすること
    // ただし、１行ずつ書き込まれたほうが動いている感じがして子供が喜ぶ
    // --
    let isLeftCol = mode === "LeftCol"; // 読み出し時の可読性を考慮
    let start = isLeftCol ? 0 : 15;
    let end = isLeftCol ? 15 : 30;
    // --
    for (let idx = start; idx < end; idx++) {
        let row = isLeftCol ? (2 * idx) + 3 : (2 * (idx - 15)) + 3;
        let range = sheet.getRange(row, isLeftCol ? 2 : 13, 1, 5);
        // --
        let values = range.getValues();
        values[0] = createSubject(list[idx]);
        range.setValues(values); // <= 書き込み
    }
}