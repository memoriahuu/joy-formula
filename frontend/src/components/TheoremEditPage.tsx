import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, FileText, Smile, BarChart3, BatteryCharging as BatteryChargingIcon } from 'lucide-react';
import svgPaths from "../imports/svg-yq6vd11jyo";
import { insightsApi } from '../api';
import type { JoyInsight } from '../types';

//Theorem page with design only
function Frame4() {
  return (
    <div className="bg-[#ddd] content-stretch flex h-[24.344px] items-center justify-center px-[40.342px] py-[3.478px] relative rounded-[6.956px] shrink-0 w-[101.551px]">
      <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[11.824px] text-black">Edit</p>
    </div>
  );
}

function Frame5({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#ddd] hover:bg-[#ccc] active:scale-95 transition-all content-stretch flex h-[24.344px] items-center justify-center px-[33.387px] py-[3.478px] relative rounded-[6.956px] shrink-0 w-[101.551px]"
    >
      <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[11.824px] text-black">Delete</p>
    </button>
  );
}

function Frame6({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#a9d66a] hover:bg-[#9bc55e] active:scale-95 transition-all content-stretch flex h-[24.344px] items-center justify-center px-[33.387px] py-[3.478px] relative rounded-[6.956px] shrink-0 w-[101.551px]"
    >
      <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[11.824px] text-black">Submit</p>
    </button>
  );
}

function Frame7({ onDelete, onSubmit }: { onDelete: () => void; onSubmit: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[6.26px] items-center left-[30.17px] top-[161.44px]">
      <Frame4 />
      <Frame5 onClick={onDelete} />
      <Frame6 onClick={onSubmit} />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[23.199px] relative w-[108.908px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[1.36px] not-italic text-[#2b2a2a] text-[16.111px] top-[1.91px]">JOYTHEOREM</p>
      <div className="absolute h-[1.611px] left-[13.65px] top-[10.37px] w-0">
        <div className="absolute inset-[-30%_-0.48px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.966638 2.5777">
            <path d="M0.483319 0.483319V2.09438" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[1.611px] left-[16.55px] top-[10.37px] w-0">
        <div className="absolute inset-[-30%_-0.48px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.966638 2.5777">
            <path d="M0.483319 0.483319V2.09438" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.967px] left-[13.77px] top-[13.94px] w-[2.9px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.86679 1.93341">
            <path d={svgPaths.pe089300} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[1.611px] items-center justify-center left-[66.69px] top-[12.68px] w-[0.012px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.611px] relative w-0">
            <div className="absolute inset-[-30%_-0.48px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.966638 2.5777">
                <path d="M0.483319 0.483319V2.09438" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.611px] items-center justify-center left-[63.45px] top-[12.57px] w-[0.012px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.611px] relative w-0">
            <div className="absolute inset-[-30%_-0.48px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.966638 2.5777">
                <path d="M0.483319 0.483319V2.09438" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[0.988px] items-center justify-center left-[63.63px] top-[10.1px] w-[2.907px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[0.967px] relative w-[2.9px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.86679 1.93341">
                <path d={svgPaths.pe089300} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.966638" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8({ insight, onDelete, onSubmit }: { insight?: JoyInsight; onDelete: () => void; onSubmit: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[208.73px] left-[13.05px] rounded-[8.154px] shadow-[3.261px_3.261px_14.676px_0px_rgba(109,109,109,0.25)] top-[309.02px] w-[366.093px]">
      <Frame7 onDelete={onDelete} onSubmit={onSubmit} />
      <div className="absolute flex h-[23.352px] items-center justify-center left-[59.52px] top-[31.8px] w-[108.94px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "133" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.08deg]">
          <Frame />
        </div>
      </div>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[30.17px] not-italic text-[12.658px] text-black top-[35.88px]">Your</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[168.78px] not-italic text-[12.658px] text-black top-[35.88px]">is...</p>
      <div className="absolute flex h-[60.59px] items-center justify-center left-[51.37px] top-[68.41px] w-[286.435px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.12deg]">
          <p className="font-['Itim:Regular',sans-serif] leading-[normal] not-italic relative text-[#3a3a3a] text-[16.307px] w-[286.312px] whitespace-pre-wrap">
            {insight?.insight_text || 'No pending insights yet.'}
          </p>
        </div>
      </div>
      <div className="absolute h-[2.446px] left-[62.78px] top-[53px] w-[97.842px]">
        <div className="absolute inset-[-25.01%_-0.63%_-25%_-0.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.0655 3.66925">
            <path d={svgPaths.p10206a00} id="Vector 43" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.22303" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[4.634px] items-center justify-center left-[102.73px] top-[55.44px] w-[61.993px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-2.48deg]">
          <div className="h-[1.956px] relative w-[61.967px]">
            <div className="absolute inset-[-31.27%_-0.99%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63.19 3.17896">
                <path d={svgPaths.p1d59a780} id="Vector 44" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.22303" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[70.936px] left-0 top-0 w-[80.683px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80.6826 70.9357">
        <g filter="url(#filter0_d_13_441)" id="Frame 74">
          <path d={svgPaths.p16b16440} fill="var(--fill-0, #FFDAAF)" id="Vector 14" />
          <path d={svgPaths.p14ec3d80} id="Vector 15" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26087" />
          <path d={svgPaths.p34884200} id="Vector 16" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26087" />
          <path d={svgPaths.pe5fa700} id="Vector 17" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26087" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.1386" id="filter0_d_13_441" width="80.6826" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4.20289" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_441" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_441" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[70.936px] left-[315.36px] top-[-4.89px] w-[77.306px]">
      <div className="absolute inset-[0_0_-5.93%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.3064 75.1439">
          <g filter="url(#filter0_d_13_435)" id="Frame 73">
            <path d={svgPaths.p2a2edb80} fill="var(--fill-0, #A9D66A)" id="Vector 18" />
            <path d={svgPaths.p1988c600} id="Vector 19" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26245" />
            <path d={svgPaths.p14babb00} id="Vector 20" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26245" />
            <path d={svgPaths.p2036080} id="Vector 21" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.26245" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="75.1438" id="filter0_d_13_435" width="77.3064" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.20817" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_435" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_435" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute bottom-[-0.1px] h-[35.78px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8.2px] h-[5.262px] left-[calc(50%-0.32px)] rounded-[105.235px] w-[141.015px]" data-name="Home Indicator" />
    </div>
  );
}


function Frame3({ onNavigateChat, onNavigateHome, onNavigateRepository }: { onNavigateChat: () => void; onNavigateHome: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <button onClick={onNavigateChat} className="relative shrink-0 transition-transform hover:scale-110 active:scale-95">
        <MessageCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <div className="relative shrink-0">
        <FileText className="w-6 h-6 text-[#FEB05D]" strokeWidth={1.5} />
      </div>
      <button onClick={onNavigateHome} className="relative shrink-0 transition-transform hover:scale-110 active:scale-95">
        <Smile className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button onClick={onNavigateRepository} className="relative shrink-0 transition-transform hover:scale-110 active:scale-95">
        <BarChart3 className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <div className="relative shrink-0">
        <BatteryChargingIcon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function Component({ onNavigateChat, onNavigateHome, onNavigateRepository }: { onNavigateChat: () => void; onNavigateHome: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[84.797px] left-[-1.63px] top-[766.43px] w-[394.631px]" data-name="标签栏">
      <Component1 />
      <Frame3 onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}

interface TheoremEditPageProps {
  onNavigateChat: () => void;
  onNavigateHome: () => void;
  onNavigateRepository: () => void;
  onSubmit: () => void;
}
interface TheoremEditPageProps {
  insight?: JoyInsight;
  onNavigateChat: () => void;
  onNavigateHome: () => void;
  onNavigateRepository: () => void;
  onBack: () => void;
}

export default function TheoremEditPage({ insight, onNavigateChat, onNavigateHome, onNavigateRepository, onBack }: TheoremEditPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<JoyInsight | undefined>(insight);

  useEffect(() => {
    if (insight) {
      setCurrentInsight(insight);
      return;
    }

    const loadFirstPendingInsight = async () => {
      try {
        const data = await insightsApi.getInsights();
        const pending = data.find(item => !item.is_confirmed && !item.is_rejected);
        setCurrentInsight(pending);
      } catch (error) {
        console.error('Failed to load insights:', error);
      }
    };

    loadFirstPendingInsight();
  }, [insight]);

  const handleDelete = async () => {
    if (!currentInsight) return;
    
    if (!window.confirm('确认删除本条定律吗？')) {
      return;
    }
    
    setIsLoading(true);
    try {
      await insightsApi.rejectInsight(currentInsight.id);
      alert('已删除');
      onBack();
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to delete insight';
      alert(errorMsg);
      console.error('Failed to delete insight:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentInsight) return;
    
    setIsLoading(true);
    try {
      await insightsApi.confirmInsight(currentInsight.id);
      alert('已确认');
      onBack();
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Failed to confirm insight';
      alert(errorMsg);
      console.error('Failed to confirm insight:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white relative size-full" data-name="Thereom">
      <div className="absolute left-[321.25px] size-[47.29px] top-[221.78px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.2905 47.2905">
          <circle cx="23.6452" cy="23.6452" fill="var(--fill-0, #E0E9FF)" id="Ellipse 35" r="23.6452" />
        </svg>
      </div>
      <div className="absolute left-[75.83px] size-[32.614px] top-[199.76px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.6141 32.6141">
          <circle cx="16.3071" cy="16.3071" fill="var(--fill-0, #D7E9EF)" id="Ellipse 34" r="16.3071" />
        </svg>
      </div>
      <div className="absolute left-[185.09px] size-[32.614px] top-[150.84px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.6141 32.6141">
          <circle cx="16.3071" cy="16.3071" fill="var(--fill-0, #FFE4E4)" id="Ellipse 32" r="16.3071" />
        </svg>
      </div>
      <div className="absolute left-[18.75px] size-[53.813px] top-[88.06px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.8133 53.8133">
          <circle cx="26.9066" cy="26.9066" fill="var(--fill-0, #FFE6CB)" id="Ellipse 36" r="26.9066" />
        </svg>
      </div>
      <Frame8 insight={currentInsight} onDelete={handleDelete} onSubmit={handleSubmit} />
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[175.3px] not-italic text-[12.23px] text-black top-[53.81px]">
        Insights
      </p>
      {currentInsight?.evidence_cards?.[1] && (
        <motion.p
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[94.58px] not-italic text-[10.451px] text-black top-[216.07px] w-[273.958px] whitespace-pre-wrap line-clamp-4">
          "{currentInsight.evidence_cards[1].quote}"
        </motion.p>
      )}
      {currentInsight?.evidence_cards?.[0] && (
        <motion.p
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[42.4px] not-italic text-[10.451px] text-black top-[123.12px] w-[261.728px] whitespace-pre-wrap line-clamp-4">
          "{currentInsight.evidence_cards[0].quote}"
        </motion.p>
      )}
      <div className="absolute flex h-[2.446px] items-center justify-center left-[154.92px] top-[71.75px] w-[83.166px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#7d7d7d] h-[83.166px] rounded-[9.784px] w-[2.446px]" />
        </div>
      </div>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[175.3px] not-italic text-[12.23px] text-black top-[697.94px]">
        Evidence
      </p>
      <div className="absolute flex h-[2.446px] items-center justify-center left-[154.92px] top-[692.23px] w-[83.166px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#7d7d7d] h-[83.166px] rounded-[9.784px] w-[2.446px]" />
        </div>
      </div>
      {(currentInsight?.keywords || []).slice(0, 5).map((keyword, i) => {
        const positions = [
          { left: '69.3px', top: '580.53px', size: '12.23px', opacity: 1 },
          { left: '272.33px', top: '580.53px', size: '12.23px', opacity: 0.8 },
          { left: '168.78px', top: '598.47px', size: '20.384px', opacity: 1 },
          { left: '120.67px', top: '631.9px', size: '8.154px', opacity: 0.5 },
          { left: '240.53px', top: '643.31px', size: '12.23px', opacity: 1 },
        ];
        const pos = positions[i % positions.length];
        return (
          <motion.p
            key={keyword}
            animate={{ opacity: [pos.opacity * 0.5, pos.opacity, pos.opacity * 0.5] }}
            transition={{ duration: 4.5 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className="absolute font-['Istok_Web:Italic',sans-serif] italic leading-[normal] text-black"
            style={{ left: pos.left, top: pos.top, fontSize: pos.size }}
          >
            "{keyword}"
          </motion.p>
        );
      })}
      <Frame2 />
      <Frame1 />
      <Component onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}
