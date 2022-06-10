// 疑似enum
const MethodType = {
    SingleAddition: 0,
    SingleSubtraction: 1,
    DoubleAddition: 2,
    DoubleSubtraction: 3,
    AdditionThenSubtraction: 4,
    SubtractionThenAddition: 5,
    SingleMultiplication: 6,
}

function getCul(methodType, idx) {
    switch (methodType) {
        case MethodType.SingleAddition:
        case MethodType.DoubleAddition:
            return 1;
        case MethodType.SingleSubtraction:
        case MethodType.DoubleSubtraction:
            return -1;
        case MethodType.AdditionThenSubtraction:
            return idx === 0 ? 1 : -1;
        case MethodType.SubtractionThenAddition:
            return idx === 0 ? -1 : 1;
        default:
            return 0;
    }
}

function detectSingle(subject) {
    return subject.c === undefined;
}

// 演算記号の取得
function detectOperation(type) {
    switch (type) {
        case MethodType.SingleAddition :
            return "+";
        case MethodType.SingleSubtraction :
            return "-";
        case MethodType.SingleMultiplication :
            return "×";
    }
    return "?";
}
