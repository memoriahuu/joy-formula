import { useState, useEffect } from 'react';
import { MessageCircle, FileText, Smile, BarChart3, BatteryCharging as BatteryChargingIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import svgPaths from "../imports/svg-svkz6eqmyl";
import joyRepoTitle from "../assets/joyrepo.png";
import { insightsApi, cardsApi } from '../api';
import type { JoyInsight } from '../types';

//theorem page with card decks

function Frame9({ insight, onClick, isClickable }: { insight?: JoyInsight; onClick?: () => void; isClickable?: boolean }) {
  if (!insight) return null;
  
  const displayText = insight.statement || insight.insight_text;
  const date = new Date(insight.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div
      className={`absolute h-[251.21px] left-[47.5px] top-[299.53px] w-[297.695px] z-[5] ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="absolute flex h-[251.21px] items-center justify-center left-0 top-0 w-[297.695px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[11.48deg]">
          <div className="bg-[#a9d66a] h-[203.023px] rounded-[8.154px] shadow-[0px_3.261px_3.261px_0px_rgba(0,0,0,0.25)] w-[262.544px]" />
        </div>
      </div>
      <div className="absolute flex h-[117.992px] items-center justify-center left-[42.34px] top-[71.85px] w-[210.887px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[11.48deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#3a3a3a] text-[16.307px] w-[198.946px] whitespace-pre-wrap">
            "{displayText}"
          </p>
        </div>
      </div>
      <div className="absolute flex h-[32.965px] items-center justify-center left-[58.62px] top-[43.94px] w-[79.042px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[11.48deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#695d52] text-[12.23px]">{date}</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[39.079px] relative w-[183.454px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[2.3px] not-italic text-[#2b2a2a] text-[27.138px] top-[3.22px]">JOYTHEOREM</p>
      <div className="absolute h-[2.714px] left-[22.99px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[2.714px] left-[27.87px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[1.628px] left-[23.2px] top-[23.48px] w-[4.885px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
            <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[112.34px] top-[21.37px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[106.87px] top-[21.17px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.664px] items-center justify-center left-[107.18px] top-[17.01px] w-[4.897px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.628px] relative w-[4.885px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
                <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute h-[261.918px] left-[-88.5px] top-[30.53px] w-[286.944px]">
      <div className="absolute flex h-[261.918px] items-center justify-center left-0 top-0 w-[286.944px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[25.37deg]">
          <div className="bg-[#e6e6e6] h-[179.685px] rounded-[8.154px] shadow-[0px_3.261px_3.261px_0px_rgba(0,0,0,0.25)] w-[232.364px]" />
        </div>
      </div>
      <div className="absolute flex h-[111.649px] items-center justify-center left-[60.34px] top-[68.49px] w-[183.139px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "940" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.5deg]">
          <Frame2 />
        </div>
      </div>
      <div className="absolute flex h-[48.311px] items-center justify-center left-[89.21px] top-[128.3px] w-[77.531px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.5deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#695d52] text-[12.23px]">Feb 5th, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[39.079px] relative w-[183.454px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[2.3px] not-italic text-[#2b2a2a] text-[27.138px] top-[3.22px]">JOYTHEOREM</p>
      <div className="absolute h-[2.714px] left-[22.99px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[2.714px] left-[27.87px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[1.628px] left-[23.2px] top-[23.48px] w-[4.885px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
            <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[112.34px] top-[21.37px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[106.87px] top-[21.17px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.664px] items-center justify-center left-[107.18px] top-[17.01px] w-[4.897px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.628px] relative w-[4.885px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
                <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[261.918px] relative w-[286.944px]">
      <div className="absolute flex h-[261.918px] items-center justify-center left-0 top-0 w-[286.944px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[25.37deg]">
          <div className="bg-[#e6e6e6] h-[179.685px] rounded-[8.154px] shadow-[0px_3.261px_3.261px_0px_rgba(0,0,0,0.25)] w-[232.364px]" />
        </div>
      </div>
      <div className="absolute flex h-[111.649px] items-center justify-center left-[60.34px] top-[68.49px] w-[183.139px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "940" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.5deg]">
          <Frame3 />
        </div>
      </div>
      <div className="absolute flex h-[48.319px] items-center justify-center left-[93.92px] top-[132.07px] w-[77.53px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.51deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#695d52] text-[12.23px]">Feb 5th, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[39.079px] relative w-[183.454px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[2.3px] not-italic text-[#2b2a2a] text-[27.138px] top-[3.22px]">JOYTHEOREM</p>
      <div className="absolute h-[2.714px] left-[22.99px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[2.714px] left-[27.87px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[1.628px] left-[23.2px] top-[23.48px] w-[4.885px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
            <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[112.34px] top-[21.37px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[106.87px] top-[21.17px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.664px] items-center justify-center left-[107.18px] top-[17.01px] w-[4.897px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.628px] relative w-[4.885px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
                <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[261.918px] relative w-[286.944px]">
      <div className="absolute flex h-[261.918px] items-center justify-center left-0 top-0 w-[286.944px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[25.37deg]">
          <div className="bg-[#e6e6e6] h-[179.685px] rounded-[8.154px] shadow-[0px_3.261px_3.261px_0px_rgba(0,0,0,0.25)] w-[232.364px]" />
        </div>
      </div>
      <div className="absolute flex h-[111.649px] items-center justify-center left-[60.34px] top-[68.49px] w-[183.139px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "940" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.5deg]">
          <Frame4 />
        </div>
      </div>
      <div className="absolute flex h-[48.311px] items-center justify-center left-[108.83px] top-[132.95px] w-[77.531px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[24.5deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#695d52] text-[12.23px]">Feb 7th, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[39.079px] relative w-[183.454px]">
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[2.3px] not-italic text-[#2b2a2a] text-[27.138px] top-[3.22px]">JOYTHEOREM</p>
      <div className="absolute h-[2.714px] left-[22.99px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[2.714px] left-[27.87px] top-[17.47px] w-0">
        <div className="absolute inset-[-30%_-0.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
            <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[1.628px] left-[23.2px] top-[23.48px] w-[4.885px]">
        <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
            <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[112.34px] top-[21.37px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[2.714px] items-center justify-center left-[106.87px] top-[21.17px] w-[0.02px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[2.714px] relative w-0">
            <div className="absolute inset-[-30%_-0.81px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.62829 4.34211">
                <path d="M0.814147 0.814147V3.52797" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1.664px] items-center justify-center left-[107.18px] top-[17.01px] w-[4.897px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <div className="h-[1.628px] relative w-[4.885px]">
            <div className="absolute inset-[-50.01%_-16.67%_-50%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.51358 3.25681">
                <path d={svgPaths.p1a5f3800} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.62829" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute h-[228.753px] left-[180.5px] top-[469.53px] w-[267.752px]">
      <div className="absolute flex h-[228.753px] items-center justify-center left-0 top-0 w-[267.752px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-13.43deg]">
          <div className="bg-[#e6e6e6] h-[179.685px] rounded-[8.154px] shadow-[0px_3.261px_3.261px_0px_rgba(0,0,0,0.25)] w-[232.364px]" />
        </div>
      </div>
      <div className="absolute flex h-[83.469px] items-center justify-center left-[54.63px] top-[68.49px] w-[187.41px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "940" } as React.CSSProperties}>
        <div className="flex-none rotate-[-14.4deg]">
          <Frame5 />
        </div>
      </div>
      <div className="absolute flex h-[36.584px] items-center justify-center left-[123.46px] top-[124.58px] w-[79.057px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-14.4deg]">
          <p className="font-['Istok_Web:Regular',sans-serif] leading-[normal] not-italic relative text-[#695d52] text-[12.23px]">Feb 7th, 2026</p>
        </div>
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


function Frame7({ onNavigateChat, onNavigateHome, onNavigateRepository }: { onNavigateChat: () => void; onNavigateHome: () => void; onNavigateRepository: () => void }) {
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
      <Frame7 onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} onNavigateRepository={onNavigateRepository} />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[12.523px] relative w-[7.338px]">
      <div className="absolute inset-[-9.77%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.78485 14.9689">
          <g id="Frame 68">
            <path d="M1.22336 1.22303V5.29979" id="Vector 3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
            <path d="M8.56154 1.22303V5.29979" id="Vector 4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
            <path d={svgPaths.p39fa9700} id="Vector 5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[12.523px] left-[30.98px] top-[21.2px] w-[7.338px]">
      <div className="absolute inset-[-9.77%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.78485 14.9689">
          <g id="Frame 67">
            <path d="M1.22336 1.22303V5.29979" id="Vector 3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
            <path d="M8.56158 1.22303V5.2998" id="Vector 4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
            <path d={svgPaths.p39fa9700} id="Vector 5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.44606" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[48.921px] left-[113.33px] top-[41.58px] w-[173.67px]">
      <div className="absolute flex h-[12.576px] items-center justify-center left-[154.92px] top-[20.38px] w-[7.43px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <Frame1 />
        </div>
      </div>
      <Frame />
      <img
        alt="JOYREPO"
        className="absolute left-0 top-0 h-full w-full object-contain"
        src={joyRepoTitle}
      />
    </div>
  );
}

interface TheoremPageProps {
  onNavigateChat: () => void;
  onNavigateHome: () => void;
  onNavigateRepository: () => void;
  onEditInsight?: (insight: JoyInsight) => void;
}

export default function TheoremPage({ onNavigateChat, onNavigateHome, onNavigateRepository, onEditInsight }: TheoremPageProps) {
  const [insights, setInsights] = useState<JoyInsight[]>([]);
  const [confirmedInsights, setConfirmedInsights] = useState<JoyInsight[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 获取最新的JoyCard和总数
  useEffect(() => {
    const loadLatestCard = async () => {
      try {
        const response = await cardsApi.getCards(0, 1);
        setTotalCards(response.total || 0);
      } catch (error) {
        console.error('Failed to load latest card:', error);
      }
    };

    loadLatestCard();
  }, []);

  // 获取定律列表
  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await insightsApi.getInsights();
      setInsights(data);
      // 过滤出未被拒绝的定律
      const confirmed = data.filter(item => !item.is_rejected);
      setConfirmedInsights(confirmed);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.detail || error?.message || 'Failed to fetch insights';
      setError(errorMsg);
      console.error('Failed to fetch insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    if (confirmedInsights.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(prev => Math.min(prev, confirmedInsights.length - 1));
  }, [confirmedInsights.length]);

  return (
    <div className="bg-white relative size-full" data-name="Thereom">
      {confirmedInsights.length > 0 && (
        <Frame9
          insight={confirmedInsights[currentIndex]}
          onClick={onEditInsight ? () => onEditInsight(confirmedInsights[currentIndex]) : undefined}
          isClickable={Boolean(onEditInsight)}
        />
      )}
      {confirmedInsights.length > 0 && (
        <div className="absolute left-0 right-0 top-[255px] z-[6] text-center pointer-events-none">
          <p className="text-[12px] text-[#695d52] font-['Istok_Web:Regular',sans-serif]">
            Joy Theorem {currentIndex + 1} / {confirmedInsights.length}
          </p>
        </div>
      )}
      {confirmedInsights.length > 1 && !isLoading && insights.length > 0 && (
        <>
          <button
            aria-label="Previous theorem"
            className={`absolute left-[18px] top-[420px] z-[6] h-[28px] w-[28px] rounded-full border border-[#e5e5e5] bg-white/90 shadow-sm transition-opacity ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-white'}`}
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 text-[#695d52]" />
          </button>
          <button
            aria-label="Next theorem"
            className={`absolute right-[18px] top-[420px] z-[6] h-[28px] w-[28px] rounded-full border border-[#e5e5e5] bg-white/90 shadow-sm transition-opacity ${currentIndex === confirmedInsights.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-white'}`}
            onClick={() => setCurrentIndex(prev => Math.min(confirmedInsights.length - 1, prev + 1))}
            disabled={currentIndex === confirmedInsights.length - 1}
          >
            <ChevronRight className="h-4 w-4 text-[#695d52]" />
          </button>
        </>
      )}
      <Frame8 />
      <div className="absolute flex h-[388.465px] items-center justify-center left-[138.5px] top-[64.53px] w-[386.334px] pointer-events-none" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "959" } as React.CSSProperties}>
        <div className="flex-none rotate-[-48.45deg]">
          <Frame12 />
        </div>
      </div>
      <div className="absolute flex h-[306.921px] items-center justify-center left-[-116.5px] top-[496.53px] w-[327.324px] pointer-events-none" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "959" } as React.CSSProperties}>
        <div className="flex-none rotate-[-9.8deg]">
          <Frame11 />
        </div>
      </div>
      <Frame10 />

      {/* 暗色背景遮罩 */}
      {(isLoading || confirmedInsights.length === 0 || error) && (
        <div className="absolute inset-0 bg-black/40 z-10" style={{ top: 0, bottom: 0 }} />
      )}
      
      {/* 中心状态卡片 */}
      {(isLoading || confirmedInsights.length === 0 || error) && (
        <div className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none z-20" style={{ top: '100px', bottom: '150px' }}>
          <div className="bg-white rounded-lg shadow-2xl p-10 py-14 max-w-sm w-full pointer-events-auto min-h-[350px] flex flex-col justify-center">
            {isLoading ? (
              <div className="text-center">
                <p className="text-gray-600 font-['Istok_Web:Regular',sans-serif] text-lg">Loading...</p>
              </div>
            ) : error ? (
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <p className="text-2xl font-['Itim:Regular',sans-serif] text-red-600">Connection Error</p>
                  <p className="text-gray-600 font-['Istok_Web:Regular',sans-serif] text-sm">
                    {error}
                  </p>
                </div>
                <button
                  onClick={fetchInsights}
                  className="bg-[#FEB05D] text-white font-['Istok_Web:Regular',sans-serif] px-8 py-3 rounded-lg hover:bg-[#fd9d3d] transition-colors shadow-md"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <p className="text-2xl font-['Itim:Regular',sans-serif] text-[#2b2a2a]">No Theorem Yet</p>
                  <p className="text-gray-600 font-['Istok_Web:Regular',sans-serif]">
                    Start chatting to generate your personalized joy theorem!
                  </p>
                  {totalCards < 5 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 font-['Istok_Web:Regular',sans-serif]">
                        You have <span className="font-semibold text-[#FEB05D]">{totalCards}</span> {totalCards === 1 ? 'card' : 'cards'}
                      </p>
                      <p className="text-sm text-gray-500 font-['Istok_Web:Regular',sans-serif] mt-1">
                        Need <span className="font-semibold text-[#FEB05D]">{5 - totalCards}</span> more {(5 - totalCards) === 1 ? 'card' : 'cards'} to generate your first theorem
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={onNavigateChat}
                  className="bg-[#FEB05D] text-white font-['Istok_Web:Regular',sans-serif] px-8 py-3 rounded-lg hover:bg-[#fd9d3d] transition-colors shadow-md"
                >
                  Get More Joy
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Component onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} onNavigateRepository={onNavigateRepository} />
      <Frame6 />
    </div>
  );
}
