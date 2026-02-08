import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, FileText, Smile, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import svgPaths from "../imports/svg-bb8qo2f75h";
import svgPaths2 from "../imports/svg-qg7g61fb9c";
import svgPathsTheorem from "../imports/svg-8blp8pu86r";
import svgPathsGiftBox from "../imports/svg-bkazuxlag9";
import imgImage9 from "figma:asset/f232edc536b9310bdca4bcd53c1aee8a1be5c1d1.png";
import joyFrameTitle from "../assets/joyframe.png";
import joyBlindboxTitle from "../assets/joyblindbox .png";
import { cardsApi } from '../api';
import type { JoyCard } from '../types';

type CardType = 'scene' | 'people' | 'trigger' | 'senses' | 'feeling' | null;

interface CardData {
  title: string;
  color: string;
  backgroundColor: string;
  percentage: string;
  content: string;
  icon: React.ReactNode;
}

// Theorem Card Component
function TheoremCardFrame() {
  return (
    <div className="absolute h-[10.168px] left-[11.41px] top-[25.28px] w-[47.734px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[0.6px] not-italic text-[#2b2a2a] text-[7.061px] top-[0.84px]">JOYTHEOREM</p>
      <div className="absolute h-[0.706px] left-[5.98px] top-[4.55px] w-0">
        <div className="absolute inset-[-30%_-0.21px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.423676 1.1298">
            <path d="M0.211838 0.211838V0.917965" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.706px] left-[7.25px] top-[4.55px] w-0">
        <div className="absolute inset-[-30%_-0.21px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.423676 1.1298">
            <path d="M0.211838 0.211838V0.917965" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.424px] left-[6.04px] top-[6.11px] w-[1.271px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.69481 0.84741">
            <path d={svgPathsTheorem.p2cbb0600} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[0.706px] items-center justify-center left-[29.23px] top-[5.56px] w-[0.005px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[0.706px] relative w-0">
            <div className="absolute inset-[-30%_-0.21px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.423676 1.1298">
                <path d="M0.211838 0.211838V0.917965" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[0.706px] items-center justify-center left-[27.81px] top-[5.51px] w-[0.005px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[0.706px] relative w-0">
            <div className="absolute inset-[-30%_-0.21px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.423676 1.1298">
                <path d="M0.211838 0.211838V0.917965" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[0.433px] items-center justify-center left-[27.89px] top-[4.43px] w-[1.274px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[0.424px] relative w-[1.271px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.69481 0.84741">
                <path d={svgPathsTheorem.p2cbb0600} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="0.423676" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TheoremCardNotification() {
  return (
    <div className="absolute bg-[#f0817f] content-stretch flex flex-col items-center justify-center left-[54.63px] px-[4.892px] py-[1.631px] rounded-[6.93px] size-[13.861px] top-[1.63px]">
      <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[8.474px] text-white">1</p>
    </div>
  );
}

function TheoremCard({ onNavigateTheoremEdit }: { onNavigateTheoremEdit: () => void }) {
  return (
    <motion.button
      onClick={onNavigateTheoremEdit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute h-[63.602px] w-[97.027px] cursor-pointer"
      style={{ left: "82.35px", top: "703px" }}
    >
      {/* Shadow */}
      <div className="absolute h-[38.322px] left-0 top-[25.28px] w-[97.027px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97.027 38.3216">
          <ellipse cx="48.5135" cy="19.1608" fill="var(--fill-0, #FFEDD8)" id="Ellipse 39" rx="48.5135" ry="19.1608" />
        </svg>
      </div>
      {/* Card Stack */}
      <div className="absolute h-[59.521px] left-[13.86px] top-0 w-[69.668px]">
        <div className="absolute flex h-[55.836px] items-center justify-center left-[1.25px] top-[1.84px] w-[67.17px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="flex-none rotate-[-9.22deg]">
            <div className="bg-[#a9d66a] h-[46.753px] rounded-[2.122px] shadow-[0px_0.849px_0.849px_0px_rgba(0,0,0,0.25)] w-[60.46px]" />
          </div>
        </div>
        <div className="absolute bg-[#e6e6e6] h-[46.753px] left-[4.6px] rounded-[2.122px] shadow-[0px_0.849px_0.849px_0px_rgba(0,0,0,0.25)] top-[6.38px] w-[60.46px]" />
        <TheoremCardFrame />
        <TheoremCardNotification />
      </div>
    </motion.button>
  );
}

// Gift Box Component
function GiftBoxFrame() {
  return (
    <div className="h-[3.981px] relative w-[26.351px]">
      <img
        alt="JOYBLINDBOX"
        className="absolute inset-0 h-full w-full object-contain"
        src={joyBlindboxTitle}
      />
      <div className="absolute h-[0.431px] left-[3.19px] top-[1.59px] w-0">
        <div className="absolute inset-[-30%_-0.13px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.258736 0.689962">
            <path d="M0.129368 0.129368V0.560595" id="Vector 3" stroke="var(--stroke-0, #A28F7E)" strokeLinecap="round" strokeWidth="0.258736" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.431px] left-[3.96px] top-[1.59px] w-0">
        <div className="absolute inset-[-30%_-0.13px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.258736 0.689962">
            <path d="M0.129368 0.129368V0.560595" id="Vector 3" stroke="var(--stroke-0, #A28F7E)" strokeLinecap="round" strokeWidth="0.258736" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.431px] left-[21.89px] top-[1.67px] w-0">
        <div className="absolute inset-[-30%_-0.13px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.258736 0.689962">
            <path d="M0.129368 0.129368V0.560595" id="Vector 3" stroke="var(--stroke-0, #A28F7E)" strokeLinecap="round" strokeWidth="0.258736" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[0.431px] left-[22.67px] top-[1.67px] w-0">
        <div className="absolute inset-[-30%_-0.13px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.258736 0.689962">
            <path d="M0.129368 0.129368V0.560595" id="Vector 3" stroke="var(--stroke-0, #A28F7E)" strokeLinecap="round" strokeWidth="0.258736" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GiftBoxNotification() {
  return (
    <div className="absolute bg-[#f0817f] content-stretch flex flex-col items-center justify-center left-[68.29px] px-[4.892px] py-[1.631px] rounded-[6.93px] size-[13.861px] top-[12.95px]">
      <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[8.474px] text-white">1</p>
    </div>
  );
}

function GiftBox({ onNavigateGiftBox }: { onNavigateGiftBox?: () => void }) {
  return (
    <motion.button
      onClick={onNavigateGiftBox}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute h-[73.382px] w-[103.332px] cursor-pointer"
      style={{ left: "210px", top: "693.22px" }}
    >
      {/* Shadow ellipses */}
      <div className="absolute h-[73.382px] left-0 top-0 w-[103.332px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103.332 73.3818">
          <g id="Group 11">
            <ellipse cx="62.6735" cy="33.1887" fill="var(--fill-0, #FFD9A0)" id="Ellipse 40" rx="35.0602" ry="22.3551" transform="rotate(20.4336 62.6735 33.1887)" />
            <ellipse cx="48.5135" cy="54.221" fill="var(--fill-0, #FFEDD8)" id="Ellipse 39" rx="48.5135" ry="19.1608" />
          </g>
        </svg>
      </div>
      {/* Gift box */}
      <div className="absolute h-[51.149px] left-[19.29px] top-[11.95px] w-[64px]">
        <div className="absolute h-[17.908px] left-[19.38px] top-[32px] w-[44.624px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6239 17.9083">
            <ellipse cx="22.3119" cy="8.95413" fill="var(--fill-0, #B4B4B4)" id="Ellipse 28" rx="22.3119" ry="8.95413" />
          </svg>
        </div>
        <div className="absolute h-[41.366px] left-[0.08px] top-[9.78px] w-[56.509px]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.4572 41.313">
            <g id="Vector">
              <path d={svgPathsGiftBox.p153b2480} fill="#96816F" fillOpacity="0.8" />
              <path d={svgPathsGiftBox.p27b8780} fill="#CCB69B" />
              <path d={svgPathsGiftBox.p7420000} fill="#CCB69B" />
              <path d={svgPathsGiftBox.p26a3200} fill="var(--fill-0, #FCE6CC)" />
            </g>
          </svg>
        </div>
        <div className="absolute h-[37.673px] left-0 top-0 w-[57.248px]" data-name="Vector">
          <div className="absolute inset-[0.13%_0_0.19%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.2477 37.5521">
              <g id="Vector">
                <path d={svgPathsGiftBox.p2bb8d380} fill="#96816F" />
                <path d={svgPathsGiftBox.pc728900} fill="var(--fill-0, #B19984)" />
                <path d={svgPathsGiftBox.p359bb380} fill="var(--fill-0, #B19984)" />
                <path d={svgPathsGiftBox.p334edc00} fill="var(--fill-0, #B19984)" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute flex h-[12.479px] items-center justify-center left-[5.94px] top-[36.34px] w-[26.183px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "95" } as React.CSSProperties}>
          <div className="flex-none rotate-[19.33deg]">
            <GiftBoxFrame />
          </div>
        </div>
      </div>
      <GiftBoxNotification />
    </motion.button>
  );
}

function Frame14({ summary, selectedCard, joyCard, onClose }: { summary?: string | null; selectedCard: CardType; joyCard: JoyCard | null; onClose: () => void }) {
  const cardConfigs: Record<Exclude<CardType, null>, { title: string; color: string; content: string }> = {
    scene: {
      title: 'Scene',
      color: '#5a7acd',
      content: joyCard?.formula_scene || 'Around 6 PM after work, by the window at a cafe near the office',
    },
    people: {
      title: 'People',
      color: '#f98080',
      content: joyCard?.formula_people || 'Just me, enjoying my own company',
    },
    trigger: {
      title: 'Trigger',
      color: '#4190ae',
      content: joyCard?.formula_trigger || 'The warm afternoon sunlight streaming through the window',
    },
    senses: {
      title: 'Senses',
      color: '#ec871b',
      content: joyCard?.formula_sensation || 'Warm light on my skin, the smell of fresh coffee, soft background music',
    },
    feeling: {
      title: 'Event',
      color: '#8b679d',
      content: joyCard?.formula_event || 'Reading a book while sipping coffee',
    }
  };

  const isShowingCard = selectedCard !== null;
  const card = selectedCard ? cardConfigs[selectedCard] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bg-white h-[141.056px] leading-[normal] left-[35.88px] not-italic overflow-clip rounded-bl-[14.754px] rounded-br-[14.754px] shadow-[2.951px_2.951px_14.754px_1.475px_rgba(191,172,89,0.25)] top-[481.06px] w-[329.402px] whitespace-pre-wrap"
    >
      {isShowingCard && card ? (
        <>
          {/* Card Detail View */}
          <button
            onClick={onClose}
            className="absolute right-[15px] top-[15px] text-gray-400 hover:text-gray-600 text-[20px] font-bold z-10"
          >
            ×
          </button>
          <p
            className="absolute font-['Istok_Web:Bold',sans-serif] left-[20.38px] text-[18px] top-[20px]"
            style={{ color: card.color }}
          >
            {card.title}
          </p>
          <p className="absolute font-['Istok_Web:Regular',sans-serif] left-[20.38px] right-[20.38px] text-[#3a3a3a] text-[13px] leading-relaxed top-[50px]">
            {card.content}
          </p>
        </>
      ) : (
        <>
          {/* Summary View */}
          <p className="absolute font-['Istok_Web:Bold',sans-serif] h-[19.918px] left-[20.38px] text-[#f90] text-[29.508px] top-[24.46px] w-[13.279px]">"</p>
          <p className="absolute font-['Istok_Web:Bold',sans-serif] h-[22.131px] left-[290.27px] text-[#f90] text-[29.508px] top-[75.83px] w-[18.443px]">"</p>
          <p className="-translate-x-1/2 absolute font-['Istok_Web:Regular',sans-serif] left-[164.55px] text-[#3a3a3a] text-[14.754px] text-center top-[44.03px] w-[250.818px]">
            {summary || "A quiet room, a golden beam, a heart at rest. Today, the light reminded me that I am enough."}
          </p>
        </>
      )}
    </motion.div>
  );
}

function Frame17({ onNavigateChat }: { onNavigateChat: () => void }) {
  return (
    <motion.button
      onClick={onNavigateChat}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="absolute h-[71.751px] left-[69.3px] top-[607.44px] w-[265.805px] hover:scale-105 transition-transform"
    >
      <div className="absolute flex h-[71.751px] items-center justify-center left-0 top-0 w-[265.805px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[71.751px] relative w-[265.805px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265.805 71.751">
              <path d={svgPaths.p3ba2c280} fill="var(--fill-0, #FFEDD8)" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[0] left-[20.38px] not-italic text-[#6a4206] text-[19.568px] top-[34.24px]">
        <span className="leading-[normal]">{`Start Your `}</span>
        <span className="leading-[normal] text-[#ed7300]">Happiness</span>
        <span className="leading-[normal]">{` Now!`}</span>
      </p>
    </motion.button>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[78.766px] left-[15.49px] top-[57.07px] w-[75.273px]">
      <div className="absolute inset-[0_-1.41%_-4.93%_-23.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94.0172 82.6525">
          <g filter="url(#filter0_d_13_202)" id="Frame 76">
            <path d={svgPaths.p22473e80} fill="var(--fill-0, #5A7ACD)" id="Vector 10" />
            <g id="Group 6">
              <path d={svgPaths.p25d4ea00} id="Vector 11" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
              <path d={svgPaths.p340d2500} id="Vector 12" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
              <path d={svgPaths.p57ff64} id="Vector 13" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="85.1263" id="filter0_d_13_202" width="94.0172" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1.06012" dy="6.36074" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_202" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_202" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame10({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="absolute bg-[#cad4ef] h-[130.456px] left-[35.88px] overflow-clip rounded-[19.568px] top-[185.09px] w-[123.934px] cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[13.86px] not-italic text-[#5a7acd] text-[19.568px] top-[8.15px] w-[53.813px] whitespace-pre-wrap">Scene</p>
      <p className="-translate-x-full absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[115.78px] not-italic text-[#5a7acd] text-[19.568px] text-right top-[63.6px] w-[53.813px] whitespace-pre-wrap">36%</p>
      <Frame9 />
    </motion.button>
  );
}

function Frame5() {
  return (
    <div className="h-[65.919px] relative w-[71.84px]">
      <div className="absolute inset-[0_-25.3%_-4.35%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.0151 68.7898">
          <g filter="url(#filter0_d_13_180)" id="Frame 77">
            <path d={svgPaths.p1b11e300} fill="var(--fill-0, #FFA2A2)" id="Vector 18" />
            <path d={svgPaths.p1e807100} id="Vector 19" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p284e4280} id="Vector 20" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p2ae85b00} id="Vector 21" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="69.8301" id="filter0_d_13_180" width="90.0151" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="3.91058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame11({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="absolute bg-[#ffcece] h-[130.456px] left-[169.59px] overflow-clip rounded-[19.568px] top-[185.09px] w-[84.797px] cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[40.77px] not-italic text-[#f98080] text-[19.568px] top-[50.55px]">10%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[18.75px] not-italic text-[#f98080] text-[19.568px] top-[24.46px]">People</p>
      <div className="absolute flex h-[67.009px] items-center justify-center left-[5.71px] top-[74.2px] w-[72.838px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-0.87deg]">
          <Frame5 />
        </div>
      </div>
    </motion.button>
  );
}

function Frame6() {
  return (
    <div className="h-[56.546px] relative w-[69.536px]">
      <div className="absolute inset-[0_0_-6.76%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.5362 60.3666">
          <g filter="url(#filter0_d_13_194)" id="Frame 77">
            <path d={svgPaths.p23e8d400} fill="var(--fill-0, #5A9CB5)" id="Vector 14" />
            <path d={svgPaths.p1880b80} id="Vector 15" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p33ce9b00} id="Vector 16" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p11010f00} id="Vector 17" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="60.3666" id="filter0_d_13_194" width="69.5362" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="3.82067" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_194" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_194" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame12({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute bg-[#bdd3db] h-[130.456px] left-[264.17px] overflow-clip rounded-[19.568px] top-[185.09px] w-[100.288px] cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[55.44px] not-italic text-[#4190ae] text-[19.568px] top-[17.94px]">12%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[6.83px] not-italic text-[#4190ae] text-[19.568px] top-[45.92px]">Trigger</p>
      <div className="absolute flex h-[57.426px] items-center justify-center left-[30.98px] top-[74.2px] w-[70.25px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[179.27deg]">
          <Frame6 />
        </div>
      </div>
    </motion.button>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[91.157px] left-0 top-[49.74px] w-[78.477px]">
      <div className="absolute inset-[0_0_-6.75%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.4776 97.311">
          <g filter="url(#filter0_d_13_188)" id="Frame 75">
            <path d={svgPaths.p22668c00} fill="var(--fill-0, #FEB05D)" id="Vector 6" />
            <path d={svgPaths.p21035400} id="Vector 7" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p253d4600} id="Vector 8" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p10d9a100} id="Vector 9" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="97.311" id="filter0_d_13_188" width="78.4776" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6.15376" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_188" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_188" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame13({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="absolute bg-[#ffd6aa] h-[130.456px] left-[35.88px] overflow-clip rounded-[19.568px] top-[325.33px] w-[164.701px] cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[111.7px] not-italic text-[#ec871b] text-[19.568px] top-[96.21px]">36%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[89.69px] not-italic text-[#ec871b] text-[19.568px] top-[73.38px]">Senses</p>
      <Frame3 />
    </motion.button>
  );
}

function Frame7() {
  return (
    <div className="absolute h-[91.157px] left-[78.27px] top-[49.74px] w-[78.477px]">
      <div className="absolute inset-[0_0_-21.53%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.4774 110.78">
          <g filter="url(#filter0_d_13_222)" id="Frame 75">
            <path d={svgPaths.p2df76900} fill="var(--fill-0, #C197CF)" id="Vector 6" />
            <path d={svgPaths.p1d152f20} id="Vector 7" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p3626f800} id="Vector 8" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
            <path d={svgPaths.p32338a80} id="Vector 9" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="110.78" id="filter0_d_13_222" width="78.4774" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6.15376" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_222" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_222" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame20({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bg-[#ddc6ed] h-[130.456px] left-[210.36px] overflow-clip rounded-[19.568px] top-[325.33px] w-[154.917px] cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[13.86px] not-italic text-[#8b679d] text-[19.568px] top-[10.6px]">36%</p>
      <Frame7 />
    </motion.button>
  );
}

// Card Modal Component
function CardModal({ cardType, onClose, joyCard }: { cardType: CardType; onClose: () => void; joyCard: JoyCard | null }) {
  if (!cardType) return null;

  const cardConfigs: Record<Exclude<CardType, null>, CardData> = {
    scene: {
      title: 'Scene',
      color: '#5a7acd',
      backgroundColor: '#cad4ef',
      percentage: '36%',
      content: joyCard?.formula_scene || 'Around 6 PM after work, by the window at a cafe near the office',
      icon: (
        <div className="absolute left-[15px] top-[100px]">
          <div className="h-[78.766px] w-[75.273px]">
            <div className="absolute inset-[0_-1.41%_-4.93%_-23.49%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94.0172 82.6525">
                <g filter="url(#filter0_d_13_202_modal)" id="Frame 76">
                  <path d={svgPaths.p22473e80} fill="var(--fill-0, #5A7ACD)" id="Vector 10" />
                  <g id="Group 6">
                    <path d={svgPaths.p25d4ea00} id="Vector 11" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
                    <path d={svgPaths.p340d2500} id="Vector 12" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
                    <path d={svgPaths.p57ff64} id="Vector 13" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.40241" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="85.1263" id="filter0_d_13_202_modal" width="94.0172" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="1.06012" dy="6.36074" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_13_202_modal" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_13_202_modal" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      )
    },
    people: {
      title: 'People',
      color: '#f98080',
      backgroundColor: '#ffcece',
      percentage: '10%',
      content: joyCard?.formula_people || 'Just me, enjoying my own company',
      icon: (
        <div className="absolute flex h-[67.009px] items-center justify-center left-0 top-[108px] w-[72.838px]">
          <div className="-scale-y-100 flex-none rotate-[-0.87deg]">
            <Frame5 />
          </div>
        </div>
      )
    },
    trigger: {
      title: 'Trigger',
      color: '#4190ae',
      backgroundColor: '#bdd3db',
      percentage: '12%',
      content: joyCard?.formula_trigger || 'The warm afternoon sunlight streaming through the window',
      icon: (
        <div className="absolute flex h-[57.426px] items-center justify-center left-[30px] top-[108px] w-[70.25px]">
          <div className="flex-none rotate-[179.27deg]">
            <Frame6 />
          </div>
        </div>
      )
    },
    senses: {
      title: 'Senses',
      color: '#ec871b',
      backgroundColor: '#ffd6aa',
      percentage: '36%',
      content: joyCard?.formula_sensation || 'Warm light on my skin, the smell of fresh coffee, soft background music',
      icon: <div className="absolute left-0 top-[49.74px]"><Frame3 /></div>
    },
    feeling: {
      title: 'Event',
      color: '#8b679d',
      backgroundColor: '#ddc6ed',
      percentage: '36%',
      content: joyCard?.formula_event || 'Reading a book while sipping coffee',
      icon: <div className="absolute left-[78.27px] top-[49.74px]"><Frame7 /></div>
    }
  };

  const card = cardConfigs[cardType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Backdrop Blur */}
      <div className="absolute inset-0 backdrop-blur-[15px] bg-[rgba(157,157,157,0.1)]" />
      
      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[47px] top-[249px] w-[300px] h-[180px] overflow-clip rounded-[10px] shadow-[0px_0px_6px_1px_rgba(91,91,91,0.25)]"
        style={{ backgroundColor: card.backgroundColor }}
      >
        <p 
          className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[15px] not-italic text-[19.568px] top-[8px] w-[53.813px] whitespace-pre-wrap"
          style={{ color: card.color }}
        >
          {card.title}
        </p>
        {card.icon}
        <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[59px] not-italic text-[14px] text-black top-[68px] w-[215px] whitespace-pre-wrap">
          {card.content}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Rest of the components...
function Frame1() {
  return (
    <div className="h-[12.57px] relative w-[7.391px]">
      <div className="absolute inset-[-9.8%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.85586 15.034">
          <g id="Frame 68">
            <path d="M1.23224 1.2319V5.33825" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
            <path d="M8.62367 1.2319V5.33825" id="Vector 4" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
            <path d={svgPaths2.p1b24d600} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[12.57px] left-[31.54px] top-[21.29px] w-[7.391px]">
      <div className="absolute inset-[-9.8%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.85586 15.034">
          <g id="Frame 67">
            <path d="M1.23224 1.2319V5.33825" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
            <path d="M8.62381 1.23191V5.33826" id="Vector 4" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
            <path d={svgPaths2.p1b24d600} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="2.46381" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute h-[48.882px] left-[69.3px] top-[38.32px] w-[262.544px]"
    >
      <img
        alt="JOYFORMULA"
        className="absolute left-0 top-0 h-full w-full object-contain"
        src={joyFrameTitle}
      />
    </motion.div>
  );
}

function Frame8() {
  return (
    <div className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal h-[37.445px] left-[110.07px] text-black top-[141.06px] w-[27.737px]">
      <p className="absolute leading-[normal] left-0 text-[29.695px] top-[1.39px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        8
      </p>
      <p className="absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[0] left-[15.26px] text-[0px] top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="leading-[normal] text-[17.132px]" style={{ fontVariationSettings: "'wdth' 100" }}>{` `}</span>
        <span className="leading-[normal] text-[8.001px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          °C
        </span>
      </p>
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


function Frame15({ onNavigateChat, onNavigateTheorem, onNavigateRepository }: { onNavigateChat: () => void; onNavigateTheorem: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <button
        onClick={onNavigateChat}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateTheorem}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <FileText className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button className="relative shrink-0">
        <Smile className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateRepository}
        className="relative transition-transform hover:scale-110 active:scale-95"
      >
        <BarChart3 className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button className="relative shrink-0">
        <SettingsIcon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function Component1({ onNavigateChat, onNavigateTheorem, onNavigateRepository }: { onNavigateChat: () => void; onNavigateTheorem: () => void; onNavigateRepository: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[84.797px] left-[-1.63px] top-[766.43px] w-[394.631px]" data-name="标签栏">
      <Component2 />
      <Frame15 onNavigateChat={onNavigateChat} onNavigateTheorem={onNavigateTheorem} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}

interface HomePageProps {
  onNavigateChat: () => void;
  onNavigateTheorem: () => void;
  onNavigateTheoremEdit: () => void;
  onNavigateRepository: () => void;
  onNavigateGiftBox?: () => void;
}

export default function HomePage({ onNavigateChat, onNavigateTheorem, onNavigateTheoremEdit, onNavigateRepository, onNavigateGiftBox }: HomePageProps) {
  const [selectedCard, setSelectedCard] = useState<CardType>(null);
  const [latestCard, setLatestCard] = useState<JoyCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load latest joy card
  useEffect(() => {
    const loadLatestCard = async () => {
      try {
        const response = await cardsApi.getCards(0, 1);
        if (response.cards && response.cards.length > 0) {
          setLatestCard(response.cards[0]);
        }
      } catch (error) {
        console.error('Failed to load latest card:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLatestCard();
  }, []);

  return (
    <div className="relative size-full" data-name="主页：快乐公式展示" style={{ backgroundImage: "linear-gradient(rgba(90, 122, 205, 0.2) 19.712%, rgba(255, 162, 162, 0.2) 44.231%, rgba(90, 156, 181, 0.2) 75.962%, rgba(254, 176, 93, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame14 summary={latestCard?.card_summary} />
      <Frame17 onNavigateChat={onNavigateChat} />
      <p className="absolute font-['Istok_Web:Regular',sans-serif] h-[25.276px] leading-[normal] left-[261.73px] not-italic text-[16.307px] text-black top-[142.69px] w-[102.734px] whitespace-pre-wrap">Feb 6th, 2026</p>
      <Frame8 />
      <div className="absolute left-[35.88px] size-[68.49px] top-[116.6px]" data-name="image 9">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
      </div>
      <Frame2 />
      
      {/* Clickable Cards */}
      <Frame10 onClick={() => setSelectedCard('scene')} />
      <Frame11 onClick={() => setSelectedCard('people')} />
      <Frame12 onClick={() => setSelectedCard('trigger')} />
      <Frame13 onClick={() => setSelectedCard('senses')} />
      <Frame20 onClick={() => setSelectedCard('feeling')} />
      
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[256.02px] not-italic text-[8.154px] text-black top-[163.89px] w-[107.627px] whitespace-pre-wrap">This is your 96th JoyFormula.</p>
      
      {/* Theorem Card and Gift Box */}
      <TheoremCard onNavigateTheoremEdit={onNavigateTheoremEdit} />
      <GiftBox onNavigateGiftBox={onNavigateGiftBox} />
      
      <Component1 onNavigateChat={onNavigateChat} onNavigateTheorem={onNavigateTheorem} onNavigateRepository={onNavigateRepository} />
      
      {/* Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <CardModal cardType={selectedCard} onClose={() => setSelectedCard(null)} joyCard={latestCard} />
        )}
      </AnimatePresence>
    </div>
  );
}
