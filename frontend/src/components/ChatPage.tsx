import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff } from 'lucide-react';
import svgPaths from "../imports/svg-q9e9i9q3px";
import imgImage5 from "figma:asset/5e23b583e6ceb3250bf5714b464a5fc90e5eba62.png";
import imgImage12 from "figma:asset/481ec9271992b35c78654813354c17a1bbe7b8b3.png";
import imgImage13 from "figma:asset/dcf8b305885a632a490f729fe314980e8742e12a.png";
import imgHappy19496721 from "figma:asset/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png";
import { chatApi } from '../api';
import type { JoyCardData } from '../types';

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

function BarChart({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[27.394px] relative shrink-0 w-[29.677px] transition-transform hover:scale-110 active:scale-95"
      data-name="Bar chart-2"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.6769 27.394">
        <g id="Bar chart-2">
          <path d={svgPaths.p1b098100} id="Icon" stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2243" />
        </g>
      </svg>
    </button>
  );
}

function Settings() {
  return (
    <div className="h-[22.828px] relative shrink-0 w-[23.325px] opacity-70" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3246 22.8284">
        <g clipPath="url(#clip0_1_1399)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p1daa5200} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
            <path d={svgPaths.p2aef6140} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1399">
            <rect fill="white" height="22.8284" width="23.3246" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MessageSquare({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[22.828px] relative shrink-0 w-[23.325px]" data-name="MessageSquare">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={isActive ? "var(--stroke-0, #FEB05D)" : "var(--stroke-0, #4B4B4B)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

function Frame1({ onNavigateHome, onNavigateTheorem, onNavigateRepository }: { onNavigateHome: () => void; onNavigateTheorem: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <MessageSquare isActive={true} />
      <button
        onClick={onNavigateTheorem}
        className="relative rounded-[3.044px] shrink-0 size-[25.111px] opacity-70 transition-transform hover:scale-110 active:scale-95"
        data-name="image 13"
      >
        <img alt="Navigate to theorem" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[3.044px] size-full" src={imgImage13} />
      </button>
      <button
        onClick={onNavigateHome}
        className="relative shrink-0 size-[27.394px] transition-transform hover:scale-110 active:scale-95 opacity-70"
        data-name="happy_1949672 1"
      >
        <img alt="Navigate to home" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHappy19496721} />
      </button>
      <BarChart onClick={onNavigateRepository} />
      <Settings />
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
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue, false);
      setInputValue('');
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage = "I was reading by the window and the warm sunlight made me feel peaceful.";
        onSubmit(voiceMessage, true);
      }, 2000);
    } else {
      setIsRecording(false);
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
          disabled={isRecording}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isRecording}
          className="absolute bg-[#bababa] hover:bg-[#a0a0a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[23.645px] left-[277.22px] rounded-[8.154px] top-[3.26px] w-[57.89px]"
        >
          <p className="font-['Istok_Web:Bold',sans-serif] leading-[normal] not-italic text-[9.784px] text-black">Submit</p>
        </button>
        
        <button
          onClick={toggleRecording}
          className={`absolute content-stretch flex h-[29.655px] items-center left-0 px-[7.009px] py-[5.392px] rounded-[53.918px] top-0 w-[33.429px] transition-all ${
            isRecording 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-[#cbcbcb] hover:bg-[#b0b0b0]'
          }`}
        >
          {isRecording ? (
            <MicOff className="size-[18px] text-white" />
          ) : (
            <div className="relative shrink-0 size-[18.332px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="Microphone" className="absolute left-[0.24%] max-w-none size-full top-0" src={imgImage5} />
              </div>
            </div>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-[80px] top-[5px] flex items-center gap-2"
          >
            <div className="flex gap-1">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                className="w-1 h-3 bg-red-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                className="w-1 h-3 bg-red-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                className="w-1 h-3 bg-red-500 rounded-full"
              />
            </div>
            <p className="text-[10px] text-red-500 font-['Istok_Web:Regular',sans-serif]">Recording...</p>
          </motion.div>
        )}
      </AnimatePresence>
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

      // 如果对话完成并生成了卡片，显示提示
      if (response.is_complete && response.card) {
        console.log('Joy card generated:', response.card);
        // 可以在这里添加通知或跳转到卡片详情页
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
                // AI Message - positioned like Frame11
                <div className="relative" style={{ marginLeft: '30.17px', width: '314.726px' }}>
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className="-scale-y-100 flex-none rotate-180 w-full">
                        <div className="min-h-[133.627px] relative w-full">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.539 133.627">
                            <path d={svgPaths.p3e013380} fill="var(--fill-0, #EFEFEF)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="absolute flex h-[19.137px] items-center justify-center left-0 bottom-[-5px] w-[25.912px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "20" } as React.CSSProperties}>
                        <div className="-scale-y-100 flex-none rotate-[-167.86deg]">
                          <div className="h-[14.546px] relative w-[23.376px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3755 14.546">
                              <path d={svgPaths.p1156fd80} fill="var(--fill-0, #EFEFEF)" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic text-[13.187px] text-black top-[22.97px] left-[13.19px] right-[13.19px] whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic text-[#a1a1a1] text-[8.791px] mt-2">
                    {message.time}
                  </p>
                </div>
              ) : (
                // User Message - positioned like Frame6
                <div className="relative" style={{ marginLeft: '83.17px', width: '281.297px' }}>
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className="-scale-y-100 flex-none rotate-180 w-full">
                        <div className="min-h-[110.814px] relative w-full">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287.819 116.595">
                            <path d={svgPaths.p5eeaa00} fill="var(--fill-0, #FEB05D)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic text-[12.786px] text-black top-[23.65px] left-[20px] right-[20px] whitespace-pre-wrap">
                    {message.text}
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