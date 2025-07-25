"use client";

import { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Snackbar({ message, type, onClose }: SnackbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Allow for fade-out animation
  };

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-md shadow-lg text-white text-center ${bgColor}`}
      >
        <span className='font-medium'>{message}</span>
        {/* <button
          onClick={handleClose}
          className="absolute top-1/2 right-4 -translate-y-1/2 font-bold text-2xl leading-none"
        >
          &times;
        </button> */}
      </div>
    </div>
  );
}