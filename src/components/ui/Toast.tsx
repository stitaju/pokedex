import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
};

const toastColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for exit animation
    }, duration);
    return () => clearTimeout(hideTimer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-0 z-50 px-4 py-3 rounded text-white shadow-lg transition-all duration-300 ease-in-out transform ${
        toastColors[type]
      } ${
        visible
          ? 'opacity-100 translate-x-0 ease-in'
          : 'opacity-0 translate-x-20'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
