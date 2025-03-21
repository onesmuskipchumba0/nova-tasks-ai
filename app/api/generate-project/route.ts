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
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to generate project', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('API route: Received project generation request');
  
  try {
    const { language, stack, difficulty } = await request.json();
    const projectData = await OpenAIModel(
      `Generate a ${difficulty} level ${stack} project using ${language}`
    );
    
    if (!projectData) {
      throw new Error('No data received from OpenAI');
    }

    const parsedData = JSON.parse(projectData);
    console.log('API route: Successfully parsed JSON data');
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('API route error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to generate project', details: errorMessage },
      { status: 500 }
    );
  }
}
