import { motion } from 'motion/react';
import type { JoyCardData } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface JoyCardProps {
  data: JoyCardData;
  onClose?: () => void;
}

export function JoyCard({ data, onClose }: JoyCardProps) {
  const { summary, formula } = data;

  const formulaItems = [
    { label: 'Scene', value: formula.scene, icon: '🏞️', color: 'bg-blue-50 text-blue-700' },
    { label: 'People', value: formula.people, icon: '👥', color: 'bg-green-50 text-green-700' },
    { label: 'Event', value: formula.event, icon: '✨', color: 'bg-purple-50 text-purple-700' },
    { label: 'Trigger', value: formula.trigger, icon: '🎯', color: 'bg-orange-50 text-orange-700' },
    { label: 'Sensation', value: formula.sensation, icon: '💫', color: 'bg-pink-50 text-pink-700' },
  ].filter(item => item.value);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[340px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-2 border-[#FEB05D] bg-gradient-to-br from-white to-orange-50 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <CardTitle className="text-lg font-['Istok_Web:Bold',sans-serif] text-gray-800">
                  Your Joy Card
                </CardTitle>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary */}
            {summary && (
              <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                <p className="font-['Istok_Web:Bold',sans-serif] text-xs text-gray-600 mb-1">
                  Summary
                </p>
                <p className="font-['Istok_Web:Regular',sans-serif] text-sm text-gray-800">
                  {summary}
                </p>
              </div>
            )}

            {/* Formula Items */}
            <div className="space-y-2">
              <p className="font-['Istok_Web:Bold',sans-serif] text-xs text-gray-600 mb-2">
                Joy Formula
              </p>
              {formulaItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${item.color} rounded-lg p-3 border border-gray-200`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Istok_Web:Bold',sans-serif] text-xs mb-1">
                        {item.label}
                      </p>
                      <p className="font-['Istok_Web:Regular',sans-serif] text-sm break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center pt-2">
              <p className="font-['Istok_Web:Regular',sans-serif] text-xs text-gray-500 italic">
                Your joy formula has been saved! 💝
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
