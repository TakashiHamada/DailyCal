// 順番、大事
const ssIdList =
    [
        // スプレッドシートが格納されているフォルダ
        // https://drive.google.com/drive/folders/10usx9Vi9ZLJeLR8zybSbnuV835zqGqky

        "1GXpdCMm5G8sgu3rNMvMqTBAn-s96g9MvUzDB8FBaOnQ", // 0,  10までの足し算
        "19dqrMTa38sd1caYH2-gCPDDQ4JRdqtggWc_YUrt_j4c", // 1,  20までの足し算（１０といくつ）
        "1yfK-8gVzbcSuaJHMD5w4g6ao-9FsyG8oD9BgvacHb1w", // 2,  20までの足し算（くりあがり）
        "1EfaNzVGKX8Vy43UHlZ4hbwPOYP7ERTvjn6_84lOY5zo", // 3,  10単位の簡単な足し算
        "1h1_nc2--ayjRlILLUWAq_KnB4Q7Gii3LlV6r6bOB2bY", // 4,  100までの足し算（何＋何）＋（何）
        "1sjskBbprhEyqvQzXXl7oTUNNAzk64WEGXRBVOofZC9U", // 5,  10までの引き算
        "1KrL8Oqa27QOFD1ac5GGCux93Ylt1mp2Yv3IYxH5j6ys", // 6,  20までの引き算（くりさがり）
        "1f6lc5qAtW8g0XjNtlYSZGYH9lasusYJhyFdTb821sX0", // 7,  100までの引き算（何＋何）ー（何）
        "1RYkj22xGcLHgVcWH4xnGBBVzQbvEGkkxYaDXzdzk9Mc", // 8,  100までの引き算（１０単位の簡単な引き算）
        "1Vg9RG_E3NYGZu-Ymw5d-GGizrL0qcLEQyXUXFnk-01o", // 9,  100までの足し引き算（ゾロ目, 2桁と1桁）
        "1hqOwvX204dQaJfUzANnR_87nOdSDknp1IJsbu90ZgAE", // 10, 100までの足し引き算（ゾロ目, 2桁と2桁）
        "1I7PW2L8VLx4ysa9B9ruKCgfM4YKHhmLcPb6luWEYMnM", // 11, 10からの引き算
        "1AaJaYKQvefv3ti1h3-oXQUB5Bw2JE9yonXfwjcOcbqo", // 12, 10からの差
        "1QIQE3l7ev8TBxriBrNPmU0Y5Nq56lEBRCcDrFLYUZqc", // 13, 答えが奇数
        "15NOA0Q2xaVPscfqFvy-e7HXwa6ePOcPW88pgdw3hsRw", // 14, 3要素の足し算（答え１０以下）
        "1LyhE1FPqRbjw0SkaUBCk_-mtkAkoMhGIYzZr2oxiKNs", // 15, 3要素の足し算（１０といくつ）
    ];

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

function updateEach(type, sheet, month, day) {
    // 日付の記入
    sheet.getRange(1, 2).setValue(month);
    sheet.getRange(1, 4).setValue(day);

    let list = makeSubjectList(type, 30);
    console.log(list);

    write(sheet, list, "LeftCol");
    write(sheet, list, "RightCol");
}

// 必要な分だけリストを作成
function makeSubjectList(type, amount ) {
    // 一時的な入れ物
    let list = [];
    let lastSubject = null;
    // --
    while (list.length <= amount) {
        let subject = getSubjectByType(type);
        // 検査に不合格でないか
        if (subject !== null) {
            // 直前の問題と特定要素が同じではないか
            if (!isSimilarContent(subject, lastSubject)) {
                subject.idx = list.length; // idxを、むりやり挿入
                list.push(subject);
                // 重複防止のための入れ物
                lastSubject = subject;
            }
        }
    }
    return list;
}

// idxは対象外なので、要素を一つずつ比べる
function isSimilarContent(newOne, oldOne) {
    // nullチェック
    if (oldOne === null) return false;
    // --
    // 答えが同じ場合も、一定確率ではじく
    if (newOne.answer === oldOne.answer)
        if (Math.random() < 0.5)
            return true;
    // --
    // 完全一致？（idxを除く）
    return newOne.a === oldOne.a &&
        newOne.b === oldOne.b &&
        newOne.c === oldOne.c && // 2要素の場合、undefined
        newOne.methodType === oldOne.methodType;
}

function createSubject(subject) {
    let list = [];
    list[0] = "'(" + (subject.idx + 1) + ")";
    // --
    if (detectSingle(subject)) {
        list[1] = subject.a;
        list[2] = subject.methodType === MethodType.SingleAddition ? "+" : "-";
        list[3] = subject.b;
        list[4] = "'=";
    } else {
        list[1] = subject.a;
        list[2] = (subject.methodType === MethodType.DoubleAddition ||
            subject.methodType === MethodType.AdditionThenSubtraction) ? "+" : "-";
        list[3] = subject.b;
        list[4] = (subject.methodType === MethodType.DoubleAddition ||
            subject.methodType === MethodType.SubtractionThenAddition) ? "+" : "-";
        list[5] = subject.c;
        list[6] = "'=";
    }

    return list;
}

// 書き込み用
function write(sheet, subjects, mode) {
    // 注意, 1行ずつの書き込みは遅いので、増えた場合は一括にすること
    // ただし、１行ずつ書き込まれたほうが動いている感じがして子供が喜ぶ
    // --
    let isLeftCol = mode === "LeftCol"; // 読み出し時の可読性を考慮
    let start = isLeftCol ? 0 : 15;
    let end = isLeftCol ? 15 : 30;
    // --
    for (let idx = start; idx < end; idx++) {
        let row = isLeftCol ? (2 * idx) + 3 : (2 * (idx - 15)) + 3;
        let range = sheet.getRange(row, isLeftCol ? 2 : 13, 1, detectSingle(subjects[0]) ? 5 : 7);
        // --
        let values = range.getValues();
        values[0] = createSubject(subjects[idx]);
        range.setValues(values); // <= 書き込み
    }
}
