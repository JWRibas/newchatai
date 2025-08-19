// src/app/api/chat/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

// Obtenha a chave da API do ambiente
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Função para formatar as mensagens para o formato do SDK do Google
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
});

// Exporta a função POST que será o nosso endpoint da API
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiStream = await genAI
      .getGenerativeModel({ model: 'gemini-pro' }) // Modelo utilizado
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    // Converte o stream do Gemini para um formato amigável para o frontend
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Retorna a resposta como um stream de texto
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in API route:', error);
    // Retorna uma resposta de erro em formato JSON
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
