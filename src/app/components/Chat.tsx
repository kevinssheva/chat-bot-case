import Image from 'next/image';

const Chat = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className='w-full flex flex-col my-10 gap-8'>
      <div className='ml-auto py-2 px-5 rounded-[25px] bg-zinc-200 dark:bg-neutral-700 max-w-[85%] text-right'>
        <p className='break-words'>{question}</p>
      </div>
      <div className='flex gap-5 justify-start items-start max-w-[85%]'>
        <div className='w-10 aspect-square rounded-full overflow-hidden relative'>
          <Image
            src='/veronika.jpg'
            alt='profile'
            fill
            objectFit='cover'
            className='w-full h-full'
          />
        </div>
        <div className='flex-1'>
          <p className='break-words'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
