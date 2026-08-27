import React from 'react';

interface WindowControlsProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({ 
  onMinimize, 
  onMaximize, 
  onClose,
  isMaximized = false
}) => {
  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      // Default minimize behavior
      console.log('Minimizing window...');
    }
  };

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    } else {
      // Default maximize behavior
      console.log('Maximizing window...');
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Default close behavior
      window.close();
    }
  };

  return (
    <div className="flex items-center gap-1.5 pointer-events-auto">
      <button
        onClick={handleMinimize}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center group shadow-sm border border-yellow-600/50 hover:shadow-[0_0_8px_rgba(250,204,21,0.5)]"
        title="Minimize"
      >
        <span className="text-yellow-900 text-[10px] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">_</span>
      </button>
      <button
        onClick={handleMaximize}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-3 h-3 bg-blue-400 rounded-full hover:bg-blue-300 transition-colors duration-200 flex items-center justify-center group shadow-sm border border-blue-600/50 hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        title={isMaximized ? "Restore" : "Maximize"}
      >
        <span className="text-blue-900 text-[8px] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">□</span>
      </button>
      <button
        onClick={handleClose}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-3 h-3 bg-red-400 rounded-full hover:bg-red-300 transition-colors duration-200 flex items-center justify-center group shadow-sm border border-red-600/50 hover:shadow-[0_0_8px_rgba(239,68,68,0.5)]"
        title="Close"
      >
        <span className="text-red-900 text-[9px] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">×</span>
      </button>
    </div>
  );
};

export default WindowControls;