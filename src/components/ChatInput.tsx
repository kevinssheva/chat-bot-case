'use client';

import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';

const recommendationChat = [
  'Jika Anda bisa memiliki satu superpower, apa yang akan Anda pilih?',
  'Apa yang akan Anda lakukan jika Anda memiliki waktu 24 jam lagi?',
  'Apa yang akan Anda lakukan jika Anda memiliki uang tak terbatas?',
  'Apa yang akan Anda lakukan jika Anda bisa mengubah satu kejadian dalam hidup Anda?',
  'Apa yang akan Anda lakukan jika Anda bisa kembali ke masa lalu?',
];

const ChatInput = ({
  handleSubmit,
}: {
  handleSubmit: (message: string) => void;
}) => {
  const [text, setText] = useState<string>('');
  const [showRecommendation, setShowRecommendation] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxRows = 5;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const maxHeight = lineHeight * maxRows;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`; // Set height to scrollHeight or maxHeight
    }
  }, [text]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow newline if Shift is held
        return;
      }
      event.preventDefault(); // Prevent default behavior of Enter key
      if (text.trim() === '') return; // Ignore empty messages
      handleSubmit(text);
      setText('');
    }
  };

  const onSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() === '') return; // Ignore empty messages
    handleSubmit(text);
    setText('');
  };

  const handleRecommendation = (chat: string) => {
    handleSubmit(chat);
    setShowRecommendation(false);
  }

  return (
    <div className='w-full lg:w-3/4 flex justify-center items-center py-5 px-[5%] bg-slate-100 dark:bg-stone-800 fixed bottom-0'>
      <div
        className={`absolute w-full h-fit bottom-full flex flex-col divide-y-2 divide-gray-300 dark:divide-gray-800 bg-gray-200 dark:bg-zinc-700 ${
          showRecommendation && 'scale-y-100'
        } scale-y-0 origin-bottom transition`}
      >
        {
          // Chat recommendation
          recommendationChat.map((chat, index) => (
            <div
              key={index}
              className='px-5 py-4 cursor-pointer'
              onClick={() => handleRecommendation(chat)}
            >
              <p className='text-gray-800 dark:text-white'>{chat}</p>
            </div>
          ))
        }
      </div>
      <div className='bg-gray-200 dark:bg-zinc-700 w-full rounded-[25px] overflow-hidden py-3 px-5'>
        <form className='w-full flex gap-3' onSubmit={onSend}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='flex-1 bg-transparent focus:outline-none box-border resize-none'
            placeholder='Type a message'
            rows={1}
          />
          <button type='submit'>
            <IoIosSend size={24} className='text-gray-500 dark:text-white' />
          </button>
          <button type='button' onClick={() => setShowRecommendation(prev => !prev)}>
            <FiPlus size={24} className='text-gray-500 dark:text-white' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
