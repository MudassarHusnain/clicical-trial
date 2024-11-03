// components/Modal.tsx
'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
