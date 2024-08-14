import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <div className='w-full lg:w-3/4 right-0 flex items-center justify-between px-[7%] py-3 fixed top-0 z-10 bg-slate-100 dark:bg-stone-800'>
      <div className='w-10 aspect-square relative overflow-hidden rounded-full'>
        <Image
          src='/profile.jpeg'
          alt='profile'
          fill
          objectFit='cover'
          className='w-full h-full'
        />
      </div>
      <h1 className='font-bold'>Telkom Chatbot</h1>
      <ThemeSwitch />
    </div>
  );
};

export default Navbar;
