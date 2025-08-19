// src/app/page.tsx
'use client';

import { useChat } from 'ai/react'; // Importação corrigida para a versão compatível
import { toast, Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import { PromptInputWithActions } from '@/components/ui/chat'; 
import { Message, MessageAvatar, MessageContent } from '@/components/prompt-kit/message';

export default function MyChatPage() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } =
    useChat({
      // onError é um bom lugar para colocar seus toasts de erro
      onError: (err) => {
        toast.error(err.message);
      },
    });

  // Este useEffect não é mais necessário se usar o onError, mas pode ser mantido
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Container das mensagens com padding para não ficar atrás do input */}
      <div className="flex-1 overflow-y-auto pt-10 pb-36 px-4">
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
          onValueChange={(e) => handleInputChange(e as any)} // O hook espera um evento, então passamos diretamente
          onSubmit={() => {
            /* O botão dentro do componente é do tipo "submit" por padrão
              ou o handleSubmit no form cuidará disso. 
              Esta função pode ser usada para lógica adicional se necessário.
            */
          }}
        />
      </form>
    </div>
  );
}
