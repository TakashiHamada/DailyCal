
function getSubjectByType(type) {
    switch (type) {
        case  0 : return addition10();
        case  1 : return addition20_0();
        case  2 : return addition20_1();
        case  3 : return addition100_0();
        case  4 : return addition100_1();
        case  5 : return subtraction10();
        case  6 : return subtraction20();
        case  7 : return subtraction100_0();
        case  8 : return subtraction100_1();
        case  9 : return doublet_0();
        case 10 : return doublet_1();
        case 11 : return subtraction_from10();
        case 12 : return diff_from10();
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
function addition100_0() {
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
function addition100_1() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 71) + 21; // 21 - 91
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.addMode = true; // たしざん
    // 最大100
    if (subject.a - subject.b <= 100)
        return subject;
    // --
    return null;
}

function subtraction10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.b = Math.floor(Math.random() * 10); // 0 - 9
    subject.addMode = false; // ひきざん
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    // 答えが少ない数字の場合は、不合格にするときもある
    var answer = subject.a - subject.b;
    if (answer === 0) {
        if (Math.random() < 0.9) return null;
    }
    else if(answer <= 3) {
        if (Math.random() < 0.5) return null;
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
    subject.a = (Math.floor(Math.random() * 8) * 10) + 30; // 30 - 100
    subject.b = (Math.floor(Math.random() * 8) * 10) + 10; // 10 - 80
    subject.addMode = false; // ひきざん
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    return subject;
}

// オジリナル, ゾロ目, 2桁 +- 1桁
function doublet_0() {
    let origin = (Math.floor(Math.random() * 9) + 1) + ""; // 1 - 9
    let answer = parseInt(origin + origin); // 11 - 99
    let addMode = Math.random() < 0.5;
    // --
    let subject = {};
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.a = answer + (subject.b * (addMode ? -1 : 1));
    subject.addMode = addMode;
    if (subject.a < 100)
        return subject;
    // --
    return null;
}

// オジリナル, ゾロ目, 2桁 +- 2桁
function doublet_1() {
    let origin = (Math.floor(Math.random() * 9) + 1) + ""; // 1 - 9
    let answer = parseInt(origin + origin); // 11 - 99
    let addMode = Math.random() < 0.5;
    // --
    let subject = {};
    subject.b = Math.floor(Math.random() * 80) + 10; // 11 - 89
    subject.a = answer + (subject.b * (addMode ? -1 : 1));
    subject.addMode = addMode;
    // --
    if (10 < subject.a && subject.a < 100)
        return subject;
    // --
    return null;
}

// オリジナル, 10からの引き算
function subtraction_from10() {
    let subject = {};
    subject.a = 10;
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.addMode = false;
    return subject;
}

// オリジナル, 10からの変化
function diff_from10() {
    let subject = {};
    subject.a = 10;
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.addMode = Math.random() < 0.5; // たしひき算 
    return subject;
}