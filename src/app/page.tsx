// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { PromptInputWithActions } from '@/components/ui/chat';
import { Message, MessageAvatar, MessageContent } from '@/components/prompt-kit/message';

export default function MyChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl pt-10 pb-28 px-4">
        <h1 className="mb-6 text-center text-2xl font-semibold">Prompt Kit Chat</h1>
        <div className="space-y-4">
          {messages.map((m) => (
            <Message key={m.id} className={m.role === 'user' ? 'justify-end' : ''}>
              {m.role !== 'user' && (
                <MessageAvatar fallback="AI" />
              )}
              <MessageContent markdown>
                {m.parts.map((part) =>
                  part.type === 'text' ? part.text : ''
                ).join('')}
              </MessageContent>
              {m.role === 'user' && (
                <MessageAvatar fallback="Você" />
              )}
            </Message>
          ))}
        </div>
      </div>

      <PromptInputWithActions
        value={input}
        isLoading={status === 'streaming'}
        onValueChange={setInput}
        onSubmit={() => {
          if (input.trim()) {
            sendMessage({
              role: 'user',
              parts: [{ type: 'text', text: input }]
            });
            setInput('');
          }
        }}
      />
    </div>
  );
}
