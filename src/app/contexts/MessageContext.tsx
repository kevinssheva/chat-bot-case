"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axiosInstance from '@/axiosInstance';
import { MessageType } from '@/types/message';

interface MessageContextType {
  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  updateMessage: (message: MessageType) => void;
  isLoading: boolean;
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  addMessage: () => {},
  updateMessage: () => {},
  isLoading: false,
});

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const addMessage = (message: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateMessage = (message: MessageType) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 ? message : msg
      )
    );
  }

  return (
    <MessageContext.Provider value={{ messages, addMessage, updateMessage, isLoading }}>
      {children}
    </MessageContext.Provider>
  );
};
