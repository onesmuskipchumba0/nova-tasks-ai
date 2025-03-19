import OpenAI from "openai";

export async function OpenAIModel(prompt: string = "Generate a coding project"){
    console.log('OpenAI: Initializing with prompt:', prompt);

    try {
        const client = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com",
            apiKey: process.env.OPENAI_API_KEY,
        });

        console.log('OpenAI: Client initialized');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }

        const projectPrompt = `Generate a valid JSON object for a ${prompt}. Use EXACTLY one of these difficulty levels: "beginner", "intermediate", or "advanced". The response must follow this structure exactly:
        {
          "title": "Project title",
          "technology": "Main technology/framework used",
          "difficulty": "beginner" | "intermediate" | "advanced",
          "description": "Detailed project description",
          "learningPoints": ["array", "of", "learning", "points"],
          "estimatedTime": "estimated completion time",
          "prerequisites": ["required", "skills", "or", "knowledge"],
          "hints": ["helpful", "implementation", "tips"]
        }`;

        console.log('OpenAI: Sending request to API');
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages:[
                {
                    role: "system", 
                    content: "You are a JSON-only API that generates coding project ideas. Always respond with valid JSON only."
                },
                {role: "user", content: projectPrompt}
            ],
            temperature: 0.7,
            max_tokens: 4096,
            top_p: 1,
            response_format: { type: "json_object" }  // Force JSON response
        });

        const content = response.choices[0].message.content;
        
        // Validate JSON
        try {
            if (!content) {
                throw new Error('Empty response from OpenAI');
            }
            const parsedJson = JSON.parse(content);
            return JSON.stringify(parsedJson);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (parseError) {
            console.error('Failed to parse OpenAI response as JSON:', content);
            throw new Error('Invalid JSON response from OpenAI');
        }
    } catch (error) {
        console.error('OpenAI error:', error);
        throw error;
    }
}