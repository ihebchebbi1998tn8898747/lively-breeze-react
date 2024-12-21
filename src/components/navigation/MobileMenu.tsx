import React from 'react';
import { X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenuItem from './MobileMenuItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: any[];
  expandedItem: string | null;
  onToggleSubmenu: (title: string) => void;
  onStoreClick: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  menuItems,
  expandedItem,
  onToggleSubmenu,
  onStoreClick,
}: MobileMenuProps) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full bg-gradient-to-br from-[#700100] via-[#8B0000] to-[#700100] backdrop-blur-lg shadow-2xl w-[85vw] max-w-[400px] z-50"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold text-white tracking-wider">Menu</h2>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="text-white hover:text-accent transition-colors duration-300"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                <ul className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <MobileMenuItem
                      key={item.title}
                      {...item}
                      isExpanded={expandedItem === item.title}
                      onToggle={() => onToggleSubmenu(item.title)}
                    />
                  ))}
                  
                  <li className="mt-4 border-t border-white/10 pt-4">
                    <button
                      onClick={onStoreClick}
                      className="w-full flex items-center gap-3 text-white hover:text-accent transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/5"
                    >
                      <MapPin size={20} />
                      <span className="text-lg">Trouver une boutique</span>
                    </button>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={onClose}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;