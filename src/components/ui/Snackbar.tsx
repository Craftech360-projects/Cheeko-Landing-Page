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
      className={`fixed bottom-5 right-5 p-4 rounded-lg text-white transition-transform duration-300 ${bgColor} ${
        visible ? 'transform translate-y-0' : 'transform translate-y-20'
      }`}
    >
      <span>{message}</span>
      <button onClick={handleClose} className="ml-4 font-bold">
        &times;
      </button>
    </div>
  );
}