import { motion } from 'motion/react';
import type { JoyCardData } from '../types';

interface InlineJoyCardProps {
  data: JoyCardData;
  onClose?: () => void;
  onRegenerate?: () => void;
  onSubmit?: () => void;
}

export function InlineJoyCard({ data, onRegenerate, onSubmit }: InlineJoyCardProps) {
  const { summary, formula } = data;

  const formulaItems = [
    { 
      label: 'scene', 
      displayLabel: 'Scene',
      value: formula.scene 
    },
    { 
      label: 'people', 
      displayLabel: 'People',
      value: formula.people 
    },
    {
      label: 'event',
      displayLabel: 'Event',
      value: formula.event
    },
    {
      label: 'drive',
      displayLabel: 'Drive',
      value: formula.trigger
    },
    { 
      label: 'sense', 
      displayLabel: 'Sense',
      value: formula.sensation 
    },
  ].filter(item => item.value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-3 w-full"
    >
      {/* Card Container - 使用和对话气泡一样的样式 */}
      <div 
        style={{
          backgroundColor: '#FBEFE1',
          borderRadius: '20px',
          padding: '22px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <h3 
            style={{
              fontFamily: "'Istok_Web:Bold', sans-serif",
              fontSize: '13.187px',
              fontWeight: 'bold',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: 0
            }}
          >
            <span>🎉</span>
            <span>I found a new joy formula!</span>
          </h3>
        </div>

        {/* Formula List */}
        <div className="space-y-2">
          {formulaItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 w-[60px]">
                <span 
                  style={{
                    fontFamily: "'Istok_Web:Bold', sans-serif",
                    fontSize: '13.187px',
                    color: 'black'
                  }}
                >
                  "{item.displayLabel}":
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p 
                  style={{
                    fontFamily: "'Istok_Web:Regular', sans-serif",
                    fontSize: '13.187px',
                    lineHeight: '1.5',
                    color: 'black',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  "{item.value}",
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary (if exists) */}
        {summary && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <p 
              style={{
                fontFamily: "'Istok_Web:Regular', sans-serif",
                fontSize: '13.187px',
                lineHeight: '1.5',
                color: 'rgba(0,0,0,0.7)',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {(onRegenerate || onSubmit) && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontFamily: "'Istok_Web:Bold', sans-serif",
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(254, 176, 93, 0.2)',
                  color: '#D97706',
                  border: '1px solid rgba(254, 176, 93, 0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(254, 176, 93, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(254, 176, 93, 0.2)';
                }}
              >
                Regenerate
              </button>
            )}
            {onSubmit && (
              <button
                onClick={onSubmit}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontFamily: "'Istok_Web:Bold', sans-serif",
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#15803D',
                  border: '1px solid rgba(34, 197, 94, 0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                }}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
