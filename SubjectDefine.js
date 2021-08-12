function getSubjectByType(type) {
    switch (type) {
        // 1つのssで複数のtypeを使うことが可能
        // typeとssの番号は一致しないが、ほぼ一致するので、便宜上その値を使用している
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
        case 13 : return answer_add30();
        case 14 : return addition_addition10();
        case 15 : return addition_addition20_mix10();
        case -1 : return subtraction_addition_20(); // 混合は-を使用する
        case -2 : return addition_subtraction_20(); // 混合は-を使用する
        case 17 : return subtraction_subtraction_20();
        // case 18 : return null; // 18は欠番
    }
    // 例外
    return null;
}

// 答え10まで
function addition10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.b = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.methodType = MethodType.SingleAddition;
    subject.answer = subject.a + subject.b;
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
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = MethodType.SingleAddition;
    subject.answer = subject.a + subject.b;
    return subject;
}

function addition20_1() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 10); // 0 - 9
    subject.b = Math.floor(Math.random() * 10); // 0 - 9
    subject.methodType = MethodType.SingleAddition;
    subject.answer = subject.a + subject.b;
    // 検査, 繰り上がるか？
    if (10 <= subject.answer)
        return subject;
    // --
    return null;
}

// 100までの足し算, 10単位の簡単な足し算
function addition100_0() {
    let subject = {};
    subject.a = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.b = (Math.floor(Math.random() * 9) * 10) + 10; // 10 - 90
    subject.methodType = MethodType.SingleAddition;
    subject.answer = subject.a + subject.b;
    // 100まで
    if (subject.answer <= 100)
        return subject;
    // --
    return null;
}

// 2桁＋1桁, 繰り上がり無し
function addition100_1() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 71) + 21; // 21 - 91
    // 1桁が大きくなる確率を下げたい
    if (5 <= subject.a % 10) {
        if (Math.random() < 0.333)
            return null;
    }
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.methodType = MethodType.SingleAddition;
    subject.answer = subject.a + subject.b;
    // 桁が変わらないか確認
    if (Math.floor(subject.a * 0.1) === Math.floor(subject.answer * 0.1))
        return subject;
    // --
    return null;
}

function subtraction10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.b = Math.floor(Math.random() * 10); // 0 - 9
    subject.methodType = MethodType.SingleSubtraction;
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    // 答えが少ない数字の場合は、不合格にするときもある
    subject.answer = subject.a - subject.b;
    if (subject.answer === 0) {
        if (Math.random() < 0.9) return null;
    } else if (subject.answer <= 3) {
        if (Math.random() < 0.5) return null;
    }
    return subject;
}

function subtraction20() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 8) + 11; // 11 - 18
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.methodType = MethodType.SingleSubtraction;
    // 検査, 繰り下がるか？
    subject.answer = subject.a - subject.b;
    if (0 < subject.answer && subject.answer < 10)
        return subject;
    // --
    return null;
}

// 2桁＋1桁, 繰り下がり無し
function subtraction100_0() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 71) + 21; // 21 - 91
    // 1桁が小さい確率を下げたい
    if (subject.a % 10 <= 5) {
        if (Math.random() < 0.333)
            return null;
    }
    // --
    subject.b = Math.floor(Math.random() * 8) + 2; // 2 - 9
    subject.methodType = MethodType.SingleSubtraction;
    subject.answer = subject.a - subject.b;
    // 桁が変わらないか確認
    if (Math.floor(subject.a * 0.1) === Math.floor(subject.answer * 0.1))
        return subject;
    // --
    return null;
}

// 100までの引き算, 10単位の簡単な引き算
function subtraction100_1() {
    let subject = {};
    subject.a = (Math.floor(Math.random() * 6) * 10) + 30; // 30 - 90
    subject.b = (Math.floor(Math.random() * 7) * 10) + 10; // 10 - 70
    subject.methodType = MethodType.SingleSubtraction;
    // 検査, マイナスになるか？
    if (subject.a < subject.b) {
        // ひっくり返す
        subject.a = subject.b;
        subject.b = subject.a;
    }
    subject.answer = subject.a - subject.b;
    return subject;
}

// オジリナル, ゾロ目, 2桁 +- 1桁
function doublet_0() {
    let origin = (Math.floor(Math.random() * 9) + 1) + ""; // 1 - 9
    let answer = parseInt(origin + origin); // 11 - 99
    let methodType = Math.random() < 0.5 ?
        MethodType.SingleAddition : MethodType.SingleSubtraction;
    // --
    let subject = {};
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.a = answer - (subject.b * getCul(methodType));
    subject.methodType = methodType;
    subject.answer = answer;
    if (subject.a < 100)
        return subject;
    // --
    return null;
}

// オジリナル, ゾロ目, 2桁 +- 2桁
function doublet_1() {
    let origin = (Math.floor(Math.random() * 9) + 1) + ""; // 1 - 9
    let answer = parseInt(origin + origin); // 11 - 99
    let methodType = Math.random() < 0.5 ?
        MethodType.SingleAddition : MethodType.SingleSubtraction;
    // --
    let subject = {};
    subject.b = Math.floor(Math.random() * 80) + 10; // 11 - 89
    subject.a = answer - (subject.b * getCul(methodType));
    subject.methodType = methodType;
    subject.answer = answer;
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
    subject.methodType = MethodType.SingleSubtraction;
    subject.answer = subject.a - subject.b;
    return subject;
}

// オリジナル, 10からの変化
function diff_from10() {
    let subject = {};
    subject.a = 10;
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = Math.random() < 0.5 ?
        MethodType.SingleAddition : MethodType.SingleSubtraction;
    subject.answer = subject.a + (subject.b * getCul(subject.methodType));
    return subject;
}

// オリジナル, 2桁 +- 1桁, 答えが奇数になる, 足し引き算, 答えが0より大きく30未満
function answer_add30() {
    let subject = {};
    subject.a = (Math.floor(Math.random() * 11)) + 10; // 10 - 20
    subject.b = (Math.floor(Math.random() * 9) + 1); // 1 - 9
    subject.methodType = Math.random() < 0.5 ?
        MethodType.SingleAddition : MethodType.SingleSubtraction;
    // --
    let answer = subject.a + (subject.b * getCul(subject.methodType));
    // 制限チェック
    if (0 < answer && answer < 30) {
        // 奇数チェック
        if (answer % 2 === 1) {
            // 必ず繰り上がり繰り下がりがあるか？
            if (answer < 10 || ("" + subject.a)[0] !== ("" + answer)[0]) {
                return subject;
            }
        }
    }
    return null;
}

// 3つの要素, a + b + c <= 10
function addition_addition10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.b = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.c = Math.floor(Math.random() * 8) + 1; // 1 - 8
    subject.methodType = MethodType.DoubleAddition;
    subject.answer = subject.a + subject.b + subject.c;
    // --
    if (subject.answer <= 10)
        return subject;
    // --
    return null;
}

// 3つの要素, a + b + c <= 20, 2要素で必ず10
function addition_addition20_mix10() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.c = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = MethodType.DoubleAddition;
    subject.answer = subject.a + subject.b + subject.c;
    // --
    if (subject.answer <= 20) {
        // ab, ac, bc
        if (subject.a + subject.b === 10 ||
            subject.a + subject.c === 10 ||
            subject.b + subject.c === 10)
            return subject;
    }
    // --
    return null;
}

// 左 - +, 右 + -, <= 20, 1-2桁 + 1桁 + 1桁
// 左列
function subtraction_addition_20() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 16) + 5; // 5 - 20
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.c = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = MethodType.SubtractionThenAddition;
    subject.answer = subject.a - subject.b + subject.c;
    // --
    if (0 <= subject.answer && subject.answer < 20
        && subject.b < subject.a && subject.c < subject.a)
        return subject;
    // --
    return null;
}

// 右列
function addition_subtraction_20() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 15) + 1; // 1 - 15
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.c = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = MethodType.AdditionThenSubtraction;
    subject.answer = subject.a + subject.b - subject.c;
    // --
    if (0 <= subject.answer && subject.answer < 20
        && subject.b < subject.a && subject.c < subject.a)
        return subject;
    // --
    return null;
}

// a - b - c = 1桁, 1-2桁- 1桁 - 1桁
function subtraction_subtraction_20() {
    let subject = {};
    subject.a = Math.floor(Math.random() * 18) + 3; // 3 - 20
    subject.b = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.c = Math.floor(Math.random() * 9) + 1; // 1 - 9
    subject.methodType = MethodType.DoubleSubtraction;
    subject.answer = subject.a - subject.b - subject.c;
    // --
    if (0 <= subject.answer && subject.answer < 10)
        return subject;
    // --
    return null;
}