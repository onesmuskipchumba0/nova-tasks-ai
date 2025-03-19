import { OpenAIModel } from '@/utils/openai';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('API route: Received project generation request');
  
  try {
    const projectData = await OpenAIModel();
    console.log('API route: Received OpenAI response:', projectData);

    if (!projectData) {
      throw new Error('No data received from OpenAI');
    }

    const parsedData = JSON.parse(projectData);
    console.log('API route: Successfully parsed JSON data');
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to generate project', details: error.message },
      { status: 500 }
    );
  }
}
