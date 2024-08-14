'use client';

import { useContext } from 'react';
import { MessageContext } from '../contexts/MessageContext';
import axiosInstance from '@/axiosInstance';

const recommendationChat = [
  'Jika Anda bisa memiliki satu superpower, apa yang akan Anda pilih?',
  'Apa yang akan Anda lakukan jika Anda memiliki waktu 24 jam lagi?',
  'Apa yang akan Anda lakukan jika Anda memiliki uang tak terbatas?',
  'Apa yang akan Anda lakukan jika Anda bisa mengubah satu kejadian dalam hidup Anda?',
  'Apa yang akan Anda lakukan jika Anda bisa kembali ke masa lalu?',
];

const ChatRecommendation = () => {
  const { messages, addMessage, updateMessage } = useContext(MessageContext);

  const handleRecommendationClick = async (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      question: message,
      answer: 'Waiting for response...',
      createdAt: new Date().toISOString(),
    };

    addMessage(newMessage);

    try {
      const response = await axiosInstance.post('/messages', {
        question: message,
      });

      updateMessage({
        ...newMessage,
        answer: response.data.answer,
      });
    } catch (error) {
      console.error('Error sending message:', error);

      updateMessage({
        ...newMessage,
        answer: 'Failed to send message',
      });
    }
  };

  return (
    <div className='bg-zinc-200 dark:bg-stone-900 fixed left-0 w-1/4 h-screen px-5 py-10'>
      <h1 className='text-xl font-bold mb-5 text-center'>
        Recommended Question
      </h1>
      <div className='flex flex-col gap-4'>
        {recommendationChat.map((chat, index) => (
          <div
            key={index}
            className='px-5 py-4 rounded-lg bg-zinc-300 dark:bg-neutral-800 cursor-pointer hover:scale-105 transition'
            onClick={() => handleRecommendationClick(chat)}
          >
            <p className='text-gray-800 dark:text-gray-400'>{chat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRecommendation;
