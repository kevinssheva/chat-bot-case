import ChatContainer from './components/ChatContainer';
import { MessageProvider } from './contexts/MessageContext';

export default function Home() {
  return (
    <div className='container mx-auto'>
      <MessageProvider>
        <ChatContainer />
      </MessageProvider>
    </div>
  );
}
