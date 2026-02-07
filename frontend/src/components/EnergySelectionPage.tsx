import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-iurkbxnnb8";
import imgImage12 from "figma:asset/481ec9271992b35c78654813354c17a1bbe7b8b3.png";
import imgImage13 from "figma:asset/dcf8b305885a632a490f729fe314980e8742e12a.png";
import imgHappy19496721 from "figma:asset/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png";
import { explorationApi } from '../api';
import type { Recommendation } from '../types';

function Frame() {
  return (
    <div className="absolute h-[13.066px] left-[32.61px] top-[16.31px] w-[7.95px]">
      <div className="absolute inset-[-10.14%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6003 15.7163">
          <g id="Frame 67">
            <path d="M1.32531 1.32495V5.74144" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
            <path d="M9.27493 1.32497V5.74147" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
            <path d={svgPaths.p381fe200} stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[13.066px] left-[224.22px] top-[17.12px] w-[7.95px]">
      <div className="absolute inset-[-10.14%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6003 15.7163">
          <g id="Frame 67">
            <path d="M1.32531 1.32495V5.74144" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
            <path d="M9.27491 1.32496V5.74145" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
            <path d={svgPaths.p381fe200} stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.6499" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Joyblindbox() {
  return (
    <div className="absolute h-[40.768px] left-[61.15px] top-[39.14px] w-[269.882px]">
      <p className="-translate-x-1/2 absolute font-['Itim:Regular',sans-serif] leading-none left-[134.94px] not-italic text-[#2b2a2a] text-[40.768px] text-center top-0 w-[269.882px] whitespace-pre-wrap">JOYBLINDBOX</p>
      <Frame />
      <Frame1 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute bottom-[-0.1px] h-[35.78px] left-0 right-[0.27%]">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8.2px] h-[5.262px] left-[calc(50%-0.32px)] rounded-[105.235px] w-[141.015px]" />
    </div>
  );
}

function BarChart() {
  return (
    <div className="h-[27.394px] relative shrink-0 w-[29.677px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.6769 27.394">
        <g>
          <path d={svgPaths.p1b098100} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2243" />
        </g>
      </svg>
    </div>
  );
}

function Settings() {
  return (
    <div className="h-[22.828px] relative shrink-0 w-[23.325px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3246 22.8284">
        <g clipPath="url(#clip0_settings)">
          <g>
            <path d={svgPaths.p1daa5200} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
            <path d={svgPaths.p2aef6140} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_settings">
            <rect fill="white" height="22.8284" width="23.3246" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2({ onNavigateChat, onNavigateTheorem, onNavigateHome }: { onNavigateChat: () => void; onNavigateTheorem: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <button onClick={onNavigateChat} className="relative rounded-[3.044px] shrink-0 size-[27.394px] transition-transform hover:scale-110 active:scale-95">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-70 pointer-events-none rounded-[3.044px] size-full" src={imgImage12} />
      </button>
      <button onClick={onNavigateTheorem} className="relative shrink-0 size-[25.111px] transition-transform hover:scale-110 active:scale-95">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-70 pointer-events-none size-full" src={imgImage13} />
      </button>
      <button onClick={onNavigateHome} className="relative shrink-0 size-[27.394px] transition-transform hover:scale-110 active:scale-95">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-70 pointer-events-none size-full" src={imgHappy19496721} />
      </button>
      <BarChart />
      <Settings />
    </div>
  );
}

function Component1({ onNavigateChat, onNavigateTheorem, onNavigateHome }: { onNavigateChat: () => void; onNavigateTheorem: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[84.797px] left-[-1.63px] top-[766.43px] w-[394.631px]">
      <Component2 />
      <Frame2 onNavigateChat={onNavigateChat} onNavigateTheorem={onNavigateTheorem} onNavigateHome={onNavigateHome} />
    </div>
  );
}

interface EnergySelectionPageProps {
  onNavigateChat: () => void;
  onNavigateTheorem: () => void;
  onNavigateHome: () => void;
  onContinue: (energyLevel: number, recommendations: Recommendation[]) => void;
}

export default function EnergySelectionPage({ onNavigateChat, onNavigateTheorem, onNavigateHome, onContinue }: EnergySelectionPageProps) {
  const [energyLevel, setEnergyLevel] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const getEnergyColor = (level: number) => {
    if (level <= 30) return '#F0817F'; // Red
    if (level <= 70) return '#FFD666'; // Yellow
    return '#A9D66A'; // Green
  };

  const getEnergyMessage = (level: number) => {
    if (level <= 30) return 'We detect you are out of power!';
    if (level <= 70) return 'You have moderate energy';
    return 'You are full of energy!';
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateEnergyLevel(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateEnergyLevel(e);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateEnergyLevel = (e: React.PointerEvent) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setEnergyLevel(Math.round(percentage));
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, []);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const response = await explorationApi.getRecommendations(energyLevel);
      onContinue(energyLevel, response.recommendations);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      // 如果API失败，传递空数组
      onContinue(energyLevel, []);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white relative size-full">
      <Joyblindbox />
      
      {/* Energy Bar Container */}
      <div 
        ref={barRef}
        className="absolute h-[31.799px] left-[114.96px] top-[379.95px] w-[163.071px] cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'none' }}
      >
        {/* Background bar */}
        <div className="absolute inset-0 bg-[#D9D9D9] rounded-[8px] overflow-hidden">
          {/* Energy fill */}
          <div 
            className="absolute inset-y-0 left-0 transition-all duration-200 ease-out rounded-[8px]"
            style={{ 
              width: `${energyLevel}%`,
              backgroundColor: getEnergyColor(energyLevel)
            }}
          />
        </div>
        
        {/* Border */}
        <svg className="absolute inset-0 pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 163.071 31.7988">
          <g>
            <path d={svgPaths.p3daa82c0} fill="none" stroke="#999" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Energy percentage display */}
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[185px] not-italic text-[#3a3a3a] text-[24px] text-center top-[383px]">
        {energyLevel}%
      </p>

      <p className="-translate-x-1/2 absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[196.81px] not-italic text-[#3a3a3a] text-[15.889px] text-center top-[443.55px] w-[237.079px] whitespace-pre-wrap">
        Rate your current energy level
      </p>

      {/* Energy message */}
      <div className="absolute h-[16.755px] left-[102.73px] top-[478.61px] w-[187.531px]">
        <p className="-translate-x-1/2 absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[87px] not-italic text-[11.661px] text-center top-0 w-[173.998px] whitespace-pre-wrap" style={{ color: getEnergyColor(energyLevel) }}>
          {getEnergyMessage(energyLevel)}
        </p>
        {energyLevel <= 30 && (
          <>
            <div className="absolute left-[177.22px] size-[10.311px] top-[2.58px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.311 10.311">
                <circle cx="5.15549" cy="5.15549" r="4.83328" stroke="var(--stroke-0, black)" strokeWidth="0.644437" />
              </svg>
            </div>
            <div className="absolute h-[2.578px] left-[180.44px] top-[5.8px] w-0">
              <div className="absolute inset-[-12.5%_-0.32px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.644437 3.22218">
                  <path d="M0.322218 0.322218V2.89997" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.644437" />
                </svg>
              </div>
            </div>
            <div className="absolute h-[2.578px] left-[184.31px] top-[5.8px] w-0">
              <div className="absolute inset-[-12.5%_-0.32px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.644437 3.22218">
                  <path d="M0.322218 0.322218V2.89997" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.644437" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="absolute left-[126.5px] top-[540px] w-[140px] h-[50px] bg-[#A9D66A] rounded-[25px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] transition-transform hover:scale-105 active:scale-95"
      >
        <p className="font-['Istok_Web:Bold',sans-serif] text-[16px] text-white">Continue</p>
      </button>

      <Component1 onNavigateChat={onNavigateChat} onNavigateTheorem={onNavigateTheorem} onNavigateHome={onNavigateHome} />
    </div>
  );
}
