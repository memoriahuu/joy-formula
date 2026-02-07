import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatPage from './components/ChatPage';
import HomePage from './components/HomePage';
import NewRepositoryPage from './components/NewRepositoryPage';
import TheoremPage from './components/TheoremPage';
import TheoremEditPage from './components/TheoremEditPage';
import EnergySelectionPage from './components/EnergySelectionPage';
import BoxOpeningPage from './components/BoxOpeningPage';
import BoxRevealPage from './components/BoxRevealPage';
import type { Recommendation } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'chat' | 'home' | 'repository' | 'theorem' | 'theoremEdit' | 'energySelection' | 'boxOpening' | 'boxReveal'>('home');
  const [energyLevel, setEnergyLevel] = useState(50);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="bg-white relative h-[852px] w-[393px] mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 'chat' && (
          <motion.div
            key="chat"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <ChatPage 
              onNavigateHome={() => setCurrentPage('home')}
              onNavigateTheorem={() => setCurrentPage('theorem')}
              onNavigateRepository={() => setCurrentPage('repository')}
            />
          </motion.div>
        )}
        
        {currentPage === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <HomePage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateTheorem={() => setCurrentPage('theoremEdit')}
              onNavigateRepository={() => setCurrentPage('repository')}
              onNavigateGiftBox={() => setCurrentPage('energySelection')}
            />
          </motion.div>
        )}

        {currentPage === 'repository' && (
          <motion.div
            key="repository"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <NewRepositoryPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateTheorem={() => setCurrentPage('theorem')}
              onNavigateHome={() => setCurrentPage('home')}
            />
          </motion.div>
        )}

        {currentPage === 'theorem' && (
          <motion.div
            key="theorem"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <TheoremPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateRepository={() => setCurrentPage('repository')}
              onNavigateHome={() => setCurrentPage('home')}
            />
          </motion.div>
        )}

        {currentPage === 'theoremEdit' && (
          <motion.div
            key="theoremEdit"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <TheoremEditPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateRepository={() => setCurrentPage('repository')}
              onNavigateHome={() => setCurrentPage('home')}
              onSubmit={() => setCurrentPage('theorem')}
            />
          </motion.div>
        )}

        {currentPage === 'energySelection' && (
          <motion.div
            key="energySelection"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <EnergySelectionPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateTheorem={() => setCurrentPage('theorem')}
              onNavigateHome={() => setCurrentPage('home')}
              onContinue={(level, recs) => {
                setEnergyLevel(level);
                setRecommendations(recs);
                setCurrentPage('boxOpening');
              }}
            />
          </motion.div>
        )}

        {currentPage === 'boxOpening' && (
          <motion.div
            key="boxOpening"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <BoxOpeningPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateTheorem={() => setCurrentPage('theorem')}
              onNavigateHome={() => setCurrentPage('home')}
              onOpenComplete={() => setCurrentPage('boxReveal')}
              energyLevel={energyLevel}
            />
          </motion.div>
        )}

        {currentPage === 'boxReveal' && (
          <motion.div
            key="boxReveal"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <BoxRevealPage 
              onNavigateChat={() => setCurrentPage('chat')}
              onNavigateTheorem={() => setCurrentPage('theorem')}
              onNavigateHome={() => setCurrentPage('home')}
              energyLevel={energyLevel}
              recommendations={recommendations}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}