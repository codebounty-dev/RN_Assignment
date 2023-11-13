import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { checkCondition } from '../actions/mapAnswersToQuestions';



export default function Question({ item, answers, setAnswers }: any) {

  const handleResponseChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: {
        answer_value: answer,
        answer_time: new Date().getTime()
      },
    });
  };

  const renderNestedQuestions = (question: any) => {
    if (question.nesting) {
      const condition = question.nesting.find((nest: any) =>
        checkCondition(nest.rule.conditions, answers[question.id]?.answer_value)
      );

      if (condition) {
        return showQuestions(condition.question);
      }
    }

    return null;
  };

  const showQuestions = (item: any): any => {
    switch (item.type) {
      case 'text':
        return (
          <View style={style.container}>
            <Text style={style.title}>{item.title}</Text>
            <TextInput
              style={style.inputContainer}
              value={answers[item.id]?.answer_value}
              onChangeText={(text) => handleResponseChange(item.id, text)}
            />
          </View>
        );

      case 'number':
        return (
          <>
            <View style={style.container}>
              <Text style={style.title}>{item.title}</Text>
              <TextInput
                style={style.inputContainer}
                keyboardType="numeric"
                value={answers[item.id]?.answer_value}
                onChangeText={(text) => handleResponseChange(item.id, text)}
              />
            </View>
            {renderNestedQuestions(item)}
          </>
        );

      case 'mcq':
        return (
          <>
            <View style={style.container}>
              <Text style={[style.title, { marginBottom: 15 }]}>{item.title}</Text>
              {
                item.options.map((option: any) => {
                  return (
                    <TouchableOpacity
                      key={option.id}
                      onPress={() => handleResponseChange(item.id, option.value)}
                      style={[
                        style.option,
                        answers[item.id]?.answer_value === option.value && style.selectedOption,
                      ]}
                    >
                      <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}>{option.value}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            {renderNestedQuestions(item)}
          </>
        );

      default:
        return null;
    }
  }

  return (
    <>
      {showQuestions(item)}
    </>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: '#f9e0bb',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  inputContainer: {
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 0.5,
    color: 'black'
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
})