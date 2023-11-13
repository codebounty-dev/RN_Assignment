export const mapAnswersToQuestions = (answers: any, questions: any) => {
    const mappedAnswers: any = {};

    const processNestedQuestions = (question: any, answer: any) => {
        if (question.nesting) {
            question.nesting.forEach((nested: any) => {
                const nestedQuestion = nested.question;
                if (checkCondition(nested.rule.conditions, answer?.answer_value)) {
                    processQuestion(nestedQuestion);
                }
            });
        }
    };

    const processQuestion = (question: any) => {
        const answer = answers[question.id];
        if (question.type === 'mcq') {
            const selectedOption = question.options.find(
                (option: any) => option.value === answer?.answer_value
            );
            if (selectedOption) {
                mappedAnswers[question.id] = selectedOption.label;
            }
        } else {
            mappedAnswers[question.id] = answer;
        }

        processNestedQuestions(question, answer);
    };

    questions.forEach((question: any) => {
        processQuestion(question);
    });

    const finalResponse: any = [];
    Object.entries(mappedAnswers).map(([key, item]) => {
        if (item) {
            finalResponse.push({ ...item, question_id: key })
        }
    })

    return finalResponse

};


export const checkCondition = (conditions: any, parentAns: any) => {
    const operand = Number(parentAns);

    switch (conditions[0].operator) {
        case 'GTE':
            return operand >= Number(conditions[0].right_operand);
        case 'LT':
            return operand < Number(conditions[0].right_operand);
        case 'EQ':
            return parentAns === conditions[0].right_operand;
        default:
            return false;
    }
}