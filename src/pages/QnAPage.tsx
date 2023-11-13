import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../component/Button'
import Question from './Question'
import { mapAnswersToQuestions } from '../actions/mapAnswersToQuestions'
import { fetchQuestions, postQuestions } from '../actions/networkActions'

const MAX_WIDTH = Dimensions.get('screen').width

export default function QnAPage() {

    const flatListRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [apiError, setApiError] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);

    const submitAction = activeIndex == apiResponse?.questions?.length - 1

    useEffect(() => {
        fetchQuestions().then((response) => {
            setApiResponse(response)
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const onPageMove = (index: number) => {
        flatListRef.current?.scrollToIndex({ animated: true, index });
        setActiveIndex(index)
    }

    const onPageSubmit = () => {
        const result = mapAnswersToQuestions(answers, apiResponse?.questions)
        postQuestions(result)
    }

    const renderQuestionPage = ({ item }: any) => {
        return (
            <View style={style.pageContainer}>
                <Question item={item} answers={answers} setAnswers={setAnswers} />
            </View>
        )
    }


    if (apiError || loading) {
        return (
            <View style={[style.container, style.center]}>
                {
                    apiError ? <Text style={style.errorText}>{apiError}</Text> : <ActivityIndicator size='large' />
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={[style.container, { paddingHorizontal: 0 }]}>
                <FlatList
                    data={apiResponse?.questions || []}
                    ref={flatListRef}
                    renderItem={renderQuestionPage}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={style.bottomRow}>
                <Button title="Previous" disabled={activeIndex == 0} onPress={() => onPageMove(activeIndex - 1)} />
                <Button title={submitAction ? "Submit" : "Next"} onPress={() => submitAction ? onPageSubmit() : onPageMove(activeIndex + 1)} />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 10,
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    pageContainer: {
        width: MAX_WIDTH,
        padding: 10
    },

    bottomRow: {
        flexDirection: 'row',
        padding: 10
    },

    errorText: {
        fontSize: 16,
        color: 'red'
    }
})