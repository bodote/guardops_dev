import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const FileContentModal = ({ isOpen, onClose, fileContent, fileName }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">{fileName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <FaTimes />
          </button>
        </div>
        <div className="whitespace-pre-wrap break-words  text-gray-700 p-4">
          {fileContent}
        </div>
      </div>
    </div>
  );
};

export default FileContentModal;
