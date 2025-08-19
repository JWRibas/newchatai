// src/app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react'; // <<< CORREÇÃO PRINCIPAL AQUI
import { toast, Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import { PromptInputWithActions } from '@/components/ui/chat';
import { Message, MessageAvatar, MessageContent } from '@/components/prompt-kit/message';

export default function MyChatPage() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    useChat({
      // A API route para o backend. O padrão já é /api/chat
      api: '/api/chat',
      // onError é um bom lugar para colocar seus toasts de erro
      onError: (err) => {
        toast.error(`Ocorreu um erro: ${err.message}`);
      },
    });

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Container das mensagens com padding para não ficar atrás do input */}
      <div className="flex-1 overflow-y-auto pt-10 pb-40 px-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500">
              Comece a conversa. Pergunte-me qualquer coisa!
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} className={m.role === 'user' ? 'justify-end' : ''}>
              {/* Avatar do Bot */}
              {m.role !== 'user' && <MessageAvatar fallback="AI" />}
              
              <MessageContent className="bg-white p-3 rounded-lg shadow-sm">
                {m.content}
              </MessageContent>

              {/* Avatar do Usuário */}
              {m.role === 'user' && <MessageAvatar fallback="Você" />}
            </Message>
          ))}
        </div>
      </div>

      {/* O formulário agora envolve o componente de input */}
      <form onSubmit={handleSubmit} className="w-full">
        <PromptInputWithActions
          value={input}
          isLoading={isLoading}
          onValueChange={handleInputChange} 
          onSubmit={() => {
            // O handleSubmit do formulário cuida do envio.
            // Esta prop pode ser removida do PromptInputWithActions se não for usada.
          }}
        />
      </form>
    </div>
  );
}