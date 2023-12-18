import React, { useEffect, useState, useRef } from "react";

const hello = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div ref={modalRef} className="modal">
          <p>Modal content goes here</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default hello;
