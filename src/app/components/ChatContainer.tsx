'use client';

import ChatInput from '@/components/ChatInput';
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import Chat from './Chat';
import { MessageContext } from '../contexts/MessageContext';
import axiosInstance from '@/axiosInstance';
import { SyncLoader } from 'react-spinners';
import Navbar from '@/components/Navbar';
import ChatRecommendation from './ChatRecommendation';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const ChatContainer = () => {
  const { messages, addMessage, updateMessage, isLoading } =
    useContext(MessageContext);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll ke elemen akhir chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Trigger setiap kali chatData berubah

  const handleMessageSubmit = async (message: string) => {
    // Tambahkan pesan sementara ke state untuk menampilkan segera
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
    <div className='w-full flex justify-end'>
      <ChatRecommendation />
      <div className='w-3/4 self-end h-full flex flex-col justify-center items-center container px-[5%]'>
        <Navbar />
        <div className='flex-1 w-full py-[4rem]'>
          {isLoading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <SyncLoader
                color='#FF0000'
                size={10}
                cssOverride={override}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Chat key={index} question={msg.question} answer={msg.answer} />
              ))}
            </>
          )}
          <div ref={chatEndRef} /> {/* Elemen untuk scroll otomatis */}
        </div>
        <div className='w-3/4 flex justify-center items-center py-5 px-[5%] bg-slate-100 dark:bg-stone-800 fixed bottom-0'>
          <ChatInput handleSubmit={handleMessageSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
