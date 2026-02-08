import { motion } from 'motion/react';
import type { JoyCardData } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface JoyCardProps {
  data: JoyCardData;
  onClose?: () => void;
  onRegenerate?: () => void;
  onSubmit?: () => void;
  cardId?: string;
}

export function JoyCard({ data, onClose, onRegenerate, onSubmit, cardId }: JoyCardProps) {
  const { summary, formula } = data;

  const formulaItems = [
    { label: 'Scene', value: formula.scene, icon: '🏞️', color: 'bg-blue-50 text-blue-700' },
    { label: 'People', value: formula.people, icon: '👥', color: 'bg-green-50 text-green-700' },
    { label: 'Event', value: formula.event, icon: '✨', color: 'bg-purple-50 text-purple-700' },
    { label: 'Trigger', value: formula.trigger, icon: '🎯', color: 'bg-orange-50 text-orange-700' },
    { label: 'Sensation', value: formula.sensation, icon: '💫', color: 'bg-pink-50 text-pink-700' },
  ].filter(item => item.value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[300px]"
    >
      <Card className="border-2 border-[#FEB05D] bg-gradient-to-br from-white to-orange-50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎉</span>
            <CardTitle className="text-sm font-['Istok_Web:Bold',sans-serif] text-gray-800">
              Your Joy Card
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {/* Summary */}
          {summary && (
            <div className="bg-white/80 rounded-lg p-2.5 border border-orange-200">
              <p className="font-['Istok_Web:Bold',sans-serif] text-[10px] text-gray-600 mb-1">
                Summary
              </p>
              <p className="font-['Istok_Web:Regular',sans-serif] text-xs text-gray-800 leading-[1.4]">
                {summary}
              </p>
            </div>
          )}

          {/* Formula Items */}
          <div className="space-y-2">
            <p className="font-['Istok_Web:Bold',sans-serif] text-[10px] text-gray-600">
              Joy Formula
            </p>
            {formulaItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${item.color} rounded-lg p-2 border border-gray-200`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Istok_Web:Bold',sans-serif] text-[10px] mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-['Istok_Web:Regular',sans-serif] text-xs break-words leading-[1.3]">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-1 space-y-2">
            <p className="font-['Istok_Web:Regular',sans-serif] text-[10px] text-gray-500 italic">
              Your joy formula has been saved! 💝
            </p>

            {/* Action Buttons */}
            {(onRegenerate || onSubmit) && (
              <div className="flex gap-2 justify-center">
                {onRegenerate && cardId && (
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this card and start over?')) {
                        onRegenerate();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-[10px] font-['Istok_Web:Bold',sans-serif] bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
                  >
                    Regenerate
                  </button>
                )}
                {onSubmit && (
                  <button
                    onClick={onSubmit}
                    className="flex-1 px-3 py-1.5 text-[10px] font-['Istok_Web:Bold',sans-serif] bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
