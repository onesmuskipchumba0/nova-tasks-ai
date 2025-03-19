import OpenAI from "openai";

export async function OpenAIModel(prompt: string){
    const client  = new OpenAI({
        baseURL:"https://models.inference.ai.azure.com",
        apiKey: process.env.OPENAI_API_KEY,
    })

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages:[
            {role: "system", content:"You are a helpful assistant who generates JSON data"},
            { role:"user", content: `${prompt}, please generate this in JSON format and not as markdown or with backticks` }
        ],
        temperature: 1, 
        max_tokens: 4096,
        top_p: 1
    })

    return response.choices[0].message.content
}