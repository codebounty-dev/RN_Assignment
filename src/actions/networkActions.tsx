import staticJson from '../static.json'

export const fetchQuestions = async () => {
    const url = 'https://ea233c96-ce30-466c-bda8-4f3b0d62c7b3.mock.pstmn.io/api/v1/get-question/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // getting api limit error so return 
            return staticJson
        }
        return await response.json();
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
    }
}


export const postQuestions = async (body: any) => {
    const url = 'https://ea233c96-ce30-466c-bda8-4f3b0d62c7b3.mock.pstmn.io/api/v1/answer-question/';

    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        alert("Data Submitted!")
    } catch (error) {
        console.error('Error:', error);
    }
}

