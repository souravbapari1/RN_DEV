export async function explainAICodeError(errorMsg: string) {
    const isDevMode = process.env.NODE_ENV === 'development';
    if (!isDevMode) {
        return "";
    }

    const apiKey = 'AIzaSyD6KnW_hUt6QSee4T5ltvw7cPYy0SPJWog'; // Replace with your real key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

    const prompt = `
I have the following error in my React Native project:
I Work on A React Native project and I am trying to understand an error I am encountering.
And I'm getting this error:

${errorMsg}

Can you explain what is causing the error.sort text no code?
  `;
    console.log("thinking....");

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`Error from Gemini API: ${response.statusText}`);
    }

    const data = await response.json();

    const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No explanation returned.';
    console.log("=====================================================================");
    console.info('AI Explanation:', explanation);
    console.log("=====================================================================");

}
