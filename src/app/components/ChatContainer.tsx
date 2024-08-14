'use client';

import ChatInput from '@/components/ChatInput';
import { useEffect, useRef, useState } from 'react';
import Chat from './Chat';

interface MessagesType {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch('http://chat-server-telkom.test/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChatData();
  }, []);

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

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Kirim pesan ke backend
    try {
      const response = await fetch('http://chat-server-telkom.test/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Perbarui pesan dengan respons dari backend
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, answer: data.answer }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, answer: 'Error: Unable to get response' }
            : msg
        )
      );
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto h-screen flex flex-col justify-center container pt-[4.5rem]'>
      <div className='flex-1 w-full overflow-y-auto'>
        {messages
          .map((msg, index) => (
            <Chat key={index} question={msg.question} answer={msg.answer} />
          ))}
        <div ref={chatEndRef} /> {/* Elemen untuk scroll otomatis */}
      </div>
      <div className='w-full flex justify-center items-center py-5'>
        <ChatInput handleSubmit={handleMessageSubmit} />
      </div>
    </div>
  );
};

export default ChatContainer;
