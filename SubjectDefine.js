function getSubjectByType(type) {
    switch (type) {
        case 0 : return addition20();
        case 1 : return subtraction10();
        case 2 : return subtraction20();
    }
    // 例外
    return null;
}

function addition20() {
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