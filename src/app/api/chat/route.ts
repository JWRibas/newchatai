// src/app/api/chat/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Pega a última mensagem do usuário
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    
    // Constrói o histórico para a API do Google, excluindo a última mensagem do usuário que será usada como prompt principal
    const history = messages
      .slice(0, messages.length - 1)
      .map((message: any) => ({
        role: message.role,
        parts: [{ text: message.content }],
      }));

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash', // Modelo recomendado e mais recente
    });

    // Inicia o chat com o histórico
    const chat = model.startChat({
      history: history,
    });
    
    // Envia a última mensagem e obtém o stream
    const stream = await chat.sendMessageStream(lastUserMessage);

    // Converte o stream do SDK do Google para o formato do Vercel AI SDK
    const vercelStream = GoogleGenerativeAIStream(stream);

    // Retorna a resposta como um stream de texto
    return new StreamingTextResponse(vercelStream);

  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error: ' + (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}