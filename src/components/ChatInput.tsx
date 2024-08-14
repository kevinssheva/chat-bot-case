'use client';

import { useEffect, useRef, useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { IoIosSend } from 'react-icons/io';

const ChatInput = ({ handleSubmit }: { handleSubmit: (message: string) => void; }) => {
  const [text, setText] = useState<string>('');
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

  return (
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
      </form>
    </div>
  );
};

export default ChatInput;
