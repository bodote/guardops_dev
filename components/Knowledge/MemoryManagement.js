import React, { useEffect, useRef, useState } from "react";
import {
  FaDatabase,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaDownload, // Import the download icon
} from "react-icons/fa";
import AddVectorStoreModal from "../modal/AddVectorStoreModal";

const MemoryManagement = () => {
  const [vectorStores, setVectorStores] = useState([]);
  const [currentVectorStore, setCurrentVectorStore] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVectorStoreName, setEditVectorStoreName] = useState("");
  const [editingVectorStore, setEditingVectorStore] = useState(null);
  const menuRef = useRef(null);
  const editInputRef = useRef(null);
  const vectorStoreNameRef = useRef(null);

  const fetchVectorStores = async () => {
    try {
      const response = await fetch("/api/knowledge/files/vectorstore", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch vector stores");
      }
      const data = await response.json();
      setVectorStores(data.data.stores);
    } catch (error) {
      console.error("Error fetching vector stores:", error);
    }
  };

  const handleVectorStoreCreated = () => {
    fetchVectorStores();
  };

  useEffect(() => {
    fetchVectorStores();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }

      if (
        vectorStoreNameRef.current &&
        !vectorStoreNameRef.current.contains(event.target) &&
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        setEditingVectorStore(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setEditingVectorStore(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const deleteVectorStore = async (store_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this vector store?"
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/knowledge/files/vectorstore`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ store_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete vector store");
      }

      setVectorStores(
        vectorStores.filter(
          (vectorstore) => vectorstore.store_id !== store_id
        )
      );
      setShowMenu(null);

      if (currentVectorStore === store_id) {
        setCurrentVectorStore(null);
      }
    } catch (error) {
      console.error("Error deleting vector store:", error);
    }
  };

  const renameVectorStore = (vectorstore) => {
    setEditVectorStoreName(vectorstore.name);
    setEditingVectorStore(vectorstore.store_id);
    setShowMenu(null);
  };

  const handleInputChange = (event) => {
    setEditVectorStoreName(event.target.value);
  };

  const handleKeyPress = async (event, vectorstore) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (editVectorStoreName.trim() !== "") {
        const updatedVectorStores = vectorStores?.map((vs) =>
          vs.store_id === vectorstore.store_id
            ? { ...vs, name: editVectorStoreName }
            : vs
        );
        setVectorStores(updatedVectorStores);

        try {
          const formData = {
            store_id: vectorstore.store_id,
            name: editVectorStoreName,
          };
          const response = await fetch(`/api/knowledge/files/vectorstore`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (!response.ok) {
            throw new Error("Failed to rename vector store");
          }
        } catch (error) {
          console.error("Error renaming vector store:", error);
        }

        setEditingVectorStore(null);
      }
    }
  };


  return (
    <div className="memory-management p-4">
    <div className="vectorstores grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[80vh]">
      <div
        className="vectorstore-card border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="text-gray-500 text-4xl mb-2" />
        <p className="text-gray-500">New Database</p>
      </div>
  
      {vectorStores?.map((vectorstore, index) => (
        <div
          key={vectorstore.store_id}
          className={`relative vectorstore-card border border-gray-200 rounded-lg p-4 flex flex-col items-center cursor-pointer ${
            vectorstore.store_id === currentVectorStore
              ? "hover:bg-gray-300"
              : "hover:bg-gray-300"
          }`}
          onClick={() => setCurrentVectorStore(vectorstore.store_id)}
          onDoubleClick={() => renameVectorStore(vectorstore)}
          ref={vectorStoreNameRef}
        >
          <FaDatabase className="text-coai-blue text-4xl mb-2" />
          {editingVectorStore === vectorstore.store_id ? (
            <input
              type="text"
              value={editVectorStoreName}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyPress(e, vectorstore)}
              autoFocus
              ref={editInputRef}
              className="text-center text-gray-700 w-full"
            />
          ) : (
            <p className="text-center text-gray-700">{vectorstore.name}</p>
          )}
          <FaEllipsisV
            className="absolute top-2 right-2 text-gray-500 cursor-pointer rounded hover:bg-gray-200"
            onClick={() => setShowMenu(showMenu === index ? null : index)}
          />
          {showMenu === index && (
            <div
              className="absolute top-8 right-2 bg-white shadow-lg rounded-lg py-2 z-10 "
              ref={menuRef}
            >
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                onClick={() => renameVectorStore(vectorstore)}
              >
                <FaEdit className="inline mr-2" /> Rename
              </button>
            
              <button
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                onClick={() => deleteVectorStore(vectorstore.store_id)}
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  
    {isModalOpen && (
      <AddVectorStoreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onVectorStoreCreated={handleVectorStoreCreated}
      />
    )}
  </div>
  
  );
};

export default MemoryManagement;
