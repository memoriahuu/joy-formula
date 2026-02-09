import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, FileText, Smile, BarChart3, BatteryCharging as BatteryChargingIcon } from 'lucide-react';
import svgPaths from "../imports/svg-q9e9i9q3px";
import imgImage5 from "figma:asset/5e23b583e6ceb3250bf5714b464a5fc90e5eba62.png";
import { chatApi } from '../api';
import type { JoyCardData } from '../types';
import { InlineJoyCard } from './InlineJoyCard';

interface Message {
  type: 'ai' | 'user';
  text: string;
  time: string;
  card?: JoyCardData;
}

function Frame() {
  return (
    <div className="absolute h-[58.623px] left-[5.45px] top-[5.45px] w-[50.443px]">
      <div className="absolute inset-[-2.35%_-2.34%_-6.43%_-4.34%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.8133 63.7659">
          <g filter="url(#filter0_d_1_1404)" id="Frame 75">
            <path d={svgPaths.p227a6c00} fill="var(--fill-0, #FEB05D)" id="Vector 6" />
            <path d={svgPaths.p360eb800} id="Vector 7" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.484305" />
            <path d={svgPaths.p1236800} id="Vector 8" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.484305" />
            <path d={svgPaths.pdbd3000} id="Vector 9" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.571638" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="63.7659" id="filter0_d_1_1404" width="53.8133" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="3.42983" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1404" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1404" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white h-[56.351px] left-[167.96px] overflow-clip rounded-[13.633px] top-[24.46px] w-[56.805px]">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#eee] h-[112.519px] left-0 overflow-clip top-0 w-[393px]">
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[158.18px] not-italic text-[12.23px] text-black top-[88.87px]">Joy Somebody</p>
      <Frame5 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute bottom-[-0.1px] h-[35.78px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8.2px] h-[5.262px] left-[calc(50%-0.32px)] rounded-[105.235px] w-[141.015px]" data-name="Home Indicator" />
    </div>
  );
}


function Frame1({ onNavigateHome, onNavigateTheorem, onNavigateRepository }: { onNavigateHome: () => void; onNavigateTheorem: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <div className="relative shrink-0">
        <MessageCircle className="w-6 h-6 text-[#FEB05D]" strokeWidth={1.5} />
      </div>
      <button
        onClick={onNavigateTheorem}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <FileText className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateHome}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <Smile className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateRepository}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <BarChart3 className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <div className="relative shrink-0">
        <BatteryChargingIcon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function Component1({ onNavigateHome, onNavigateTheorem, onNavigateRepository }: { onNavigateHome: () => void; onNavigateTheorem: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[84.797px] left-[-1.63px] top-[766.43px] w-[394.631px]" data-name="标签栏">
      <Component2 />
      <Frame1 onNavigateHome={onNavigateHome} onNavigateTheorem={onNavigateTheorem} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}

interface InputBarProps {
  onSubmit: (text: string, isVoice: boolean) => void;
}

function InputBar({ onSubmit }: InputBarProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue, false);
      setInputValue('');
    }
  };

  return (
    <div className="absolute bg-[#eee] h-[64.413px] left-0 overflow-clip top-[702.02px] w-[393px]">
      <div className="absolute h-[29.655px] left-[28.54px] top-[17.12px] w-[335.11px]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your happy moment..."
          className="absolute bg-white h-[23.645px] left-[42.4px] rounded-[8.154px] top-[2.45px] w-[225.853px] px-3 text-[11px] outline-none border-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          className="absolute bg-[#bababa] hover:bg-[#a0a0a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[23.645px] left-[277.22px] rounded-[8.154px] top-[3.26px] w-[57.89px]"
        >
          <p className="font-['Istok_Web:Bold',sans-serif] leading-[normal] not-italic text-[9.784px] text-black">Submit</p>
        </button>
        
        <button
          disabled
          title="Coming soon"
          className="absolute content-stretch flex h-[29.655px] items-center left-0 px-[7.009px] py-[5.392px] rounded-[53.918px] top-0 w-[33.429px] bg-[#cbcbcb] opacity-50 cursor-not-allowed"
        >
          <div className="relative shrink-0 size-[18.332px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="Microphone" className="absolute left-[0.24%] max-w-none size-full top-0" src={imgImage5} />
            </div>
          </div>
        </button>
      </div>
      
    </div>
  );
}

interface ChatPageProps {
  onNavigateHome: () => void;
  onNavigateTheorem: () => void;
  onNavigateRepository: () => void;
}

export default function ChatPage({ onNavigateHome, onNavigateTheorem, onNavigateRepository }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 初始化对话
  useEffect(() => {
    const initChat = async () => {
      try {
        const response = await chatApi.startChat();
        setSessionId(response.session_id);
        setMessages([{
          type: 'ai',
          text: response.initial_message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch (error) {
        console.error('Failed to start chat:', error);
        // 如果API调用失败，使用默认消息
        setMessages([{
          type: 'ai',
          text: "Hello! I'm your Happiness Coach. Tell me about a moment that made you happy today.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } finally {
        setIsInitializing(false);
      }
    };

    initChat();
  }, []);

  const handleSubmit = async (text: string, isVoice: boolean) => {
    if (!sessionId || isLoading) return;

    const newUserMessage: Message = {
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(sessionId, text);
      
      const aiMessage: Message = {
        type: 'ai',
        text: response.ai_response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        card: response.card
      };

      setMessages(prev => [...prev, aiMessage]);

      // 卡片已经在消息中显示，不需要额外处理
      if (response.is_complete && response.card) {
        console.log('Joy card generated:', response.card);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // 错误时显示错误消息
      const errorMessage: Message = {
        type: 'ai',
        text: "Sorry, I encountered an error. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理卡片重新生成
  const handleRegenerateCard = async () => {
    try {
      // 开始新的对话会话
      const response = await chatApi.startChat();
      setSessionId(response.session_id);
      
      // 添加新的初始消息，保留历史记录
      const newAiMessage: Message = {
        type: 'ai',
        text: response.initial_message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMessage]);
      
      console.log('Started new chat session for regeneration');
    } catch (error) {
      console.error('Failed to regenerate:', error);
    }
  };

  // 处理卡片提交
  const handleSubmitCard = () => {
    // 跳转到主页
    onNavigateHome();
  };

  return (
    <div className="bg-white relative h-[852px] w-[393px]">
      <Frame2 />

      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[158.18px] not-italic text-[#a1a1a1] text-[12.23px] top-[137.79px]">Feb 6th, 2026</p>

      {/* Messages Container */}
      <div className="absolute left-0 right-0 top-[160px] bottom-[150px] overflow-y-auto px-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              {message.type === 'ai' ? (
                // AI Message - CSS bubble with auto height
                <div className="relative mb-4" style={{ marginLeft: '10px', width: '314.726px' }}>
                  {/* Bubble Container */}
                  <div 
                    style={{ 
                      backgroundColor: '#EFEFEF',
                      borderRadius: '20px',
                      padding: '18px',
                      position: 'relative'
                    }}
                  >
                    {/* Text Content */}
                    <p style={{
                      fontFamily: "'Istok_Web:Regular', sans-serif",
                      fontSize: '13.187px',
                      lineHeight: '1.5',
                      color: 'black',
                      margin: '0',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {message.text}
                    </p>
                  </div>
                  
                  {/* Time - below bubble, won't be affected */}
                  <p style={{
                    fontFamily: "'Istok_Web:Regular', sans-serif",
                    fontSize: '8.791px',
                    color: '#a1a1a1',
                    marginTop: '8px',
                    marginBottom: '0',
                    paddingLeft: '18px'
                  }}>
                    {message.time}
                  </p>

                  {/* Inline Joy Card */}
                  {message.card && (
                    <div style={{ marginTop: '12px' }}>
                      <InlineJoyCard 
                        data={message.card}
                        onSubmit={handleSubmitCard}
                        onRegenerate={handleRegenerateCard}
                      />
                    </div>
                  )}
                </div>
              ) : (
                // User Message - CSS bubble with auto height
                <div className="relative mb-4" style={{ marginLeft: '83.17px', width: '281.297px' }}>
                  {/* Bubble Container */}
                  <div 
                    style={{ 
                      backgroundColor: '#FEB05D',
                      borderRadius: '20px',
                      padding: '18px',
                      position: 'relative'
                    }}
                  >
                    {/* Text Content */}
                    <p style={{
                      fontFamily: "'Istok_Web:Regular', sans-serif",
                      fontSize: '12.786px',
                      lineHeight: '1.5',
                      color: 'black',
                      margin: '0',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {message.text}
                    </p>
                  </div>
                  
                  {/* Time - below bubble, right-aligned with margin */}
                  <p style={{
                    fontFamily: "'Istok_Web:Regular', sans-serif",
                    fontSize: '8.791px',
                    color: '#a1a1a1',
                    marginTop: '8px',
                    marginBottom: '0',
                    marginRight: '2px',
                    textAlign: 'right'
                  }}>
                    {message.time}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <InputBar onSubmit={handleSubmit} />
      <Component1 onNavigateHome={onNavigateHome} onNavigateTheorem={onNavigateTheorem} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}