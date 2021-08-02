
function getSubjectByType(type) {
    switch (type) {
        case 0 : return addition20_1();
        case 1 : return subtraction10();
        case 2 : return subtraction20();
        case 3 : return addition10();
        case 4 : return addition20_0();
        case 5 : return additional100_0();
    }
    // 例外
    return null;
}

// 答え10まで
function addition10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.b = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.addMode = true; // たしざん
    // 答えが10以下
    if (subject.a + subject.b <= 10)
        return subject;
    // --
    return null;
}

// 10といくつ
function addition20_0() {
    let subject = {};
    subject.a = 10;
    subject.b = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.addMode = true; // たしざん
    return subject;
}

function addition20_1() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 10); // 0 - 9
    subject.b = Math.floor(Math.random() * 10); // 0 - 9
    subject.addMode = true; // たしざん
    // 検査, 繰り上がるか？
    let chk = subject.a + subject.b;
    if (10 <= chk)
        return subject;
    // --
    return null;
}

// 100までの足し算, 10単位の簡単な足し算
function additional100_0() {
    let subject = {};
    subject.a = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.b = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.addMode = true; // たしざん
    // 100まで
    if (subject.a + subject.b <= 100)
        return subject;
    // --
    return null;
}

// 2桁＋1桁, 繰り上がりの有無どちらも含む
function additional100_1() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 71) + 21; // 21 - 91
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.addMode = true; // たしざん
    return subject;
}

function subtraction10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 10); // 0 - 9
    subject.b = Math.floor(Math.random() * 10); // 0 - 9
    subject.addMode = false; // ひきざん
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    return subject;
}

function subtraction20() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 9) + 10; // 10 - 18
    subject.b = Math.floor(Math.random() * 7) + 3; // 3 - 9
    subject.addMode = false; // ひきざん
    // 検査, 繰り下がるか？
    let chk = subject.a - subject.b;
    if (0 < chk && chk < 10)
        return subject;
    // --
    return null;
}

// 2桁＋1桁, 繰り上がりの有無どちらも含む
function subtraction100_0() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 71) + 21; // 21 - 91
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.addMode = false; // ひきざん
    return subject;
}

// 100までの引き算, 10単位の簡単な引き算
function subtraction100_1() {
    let subject = {};
    subject.a = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.b = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.addMode = false; // ひきざん
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    return subject;
}
