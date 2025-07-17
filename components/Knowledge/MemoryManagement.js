import React, { useEffect, useRef, useState } from "react";
import {
  FaDatabase,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaDownload, // Import the download icon
} from "react-icons/fa";
import { FiCpu, FiDatabase as FiDatabaseIcon } from "react-icons/fi";
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
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-Archivo text-xl font-semibold text-slate-900 flex items-center gap-2">
            <FiCpu className="w-5 h-5 text-[#0D859A]" />
            Vector Databases
          </h2>
          <span className="text-sm text-slate-500">
            {vectorStores?.length || 0} {vectorStores?.length === 1 ? 'database' : 'databases'}
          </span>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#0D859A]/10 to-[#D4DB33]/10 border border-[#0D859A]/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FiDatabaseIcon className="w-5 h-5 text-[#0D859A] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-Archivo font-semibold text-slate-900 text-sm mb-1">
                AI-Powered Memory Storage
              </h3>
              <p className="text-slate-600 font-Archivo text-sm leading-relaxed">
                Vector databases (Chroma collections) created from your organized files. These intelligent memories can be used with AI models in the playground for enhanced contextual understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Vector Stores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[400px] overflow-y-auto p-1">
          {/* New Database Card */}
          <div
            className="group border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#0D859A] hover:bg-[#0D859A]/5 transition-all duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-12 h-12 bg-slate-100 group-hover:bg-[#0D859A]/10 rounded-lg flex items-center justify-center mb-2 transition-colors duration-200">
              <FaPlus className="text-slate-400 group-hover:text-[#0D859A] text-xl transition-colors duration-200" />
            </div>
            <p className="text-slate-500 group-hover:text-[#0D859A] font-Archivo text-sm font-medium transition-colors duration-200">New Database</p>
          </div>

          {/* Vector Store Cards */}
          {vectorStores?.map((vectorstore, index) => (
            <div
              key={vectorstore.store_id}
              className={`relative group border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all duration-200 ${vectorstore.store_id === currentVectorStore
                  ? "border-[#0D859A] bg-[#0D859A]/10 shadow-lg shadow-[#0D859A]/20"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              onClick={() => setCurrentVectorStore(vectorstore.store_id)}
              onDoubleClick={() => renameVectorStore(vectorstore)}
              ref={vectorStoreNameRef}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 ${vectorstore.store_id === currentVectorStore
                  ? "bg-[#0D859A]/20"
                  : "bg-[#D4DB33]/10 group-hover:bg-[#D4DB33]/20"
                }`}>
                <FaDatabase className={`text-2xl transition-colors duration-200 ${vectorstore.store_id === currentVectorStore
                    ? "text-[#0D859A]"
                    : "text-[#D4DB33]"
                  }`} />
              </div>

              {editingVectorStore === vectorstore.store_id ? (
                <input
                  type="text"
                  value={editVectorStoreName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyPress(e, vectorstore)}
                  autoFocus
                  ref={editInputRef}
                  className="text-center text-slate-700 w-full bg-transparent border-b border-[#0D859A] focus:outline-none font-Archivo text-sm"
                />
              ) : (
                <p className="text-center text-slate-700 font-Archivo text-sm font-medium truncate w-full">{vectorstore.name}</p>
              )}

              <button
                className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/80 opacity-0 group-hover:opacity-100 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(showMenu === index ? null : index);
                }}
              >
                <FaEllipsisV className="w-3 h-3" />
              </button>

              {showMenu === index && (
                <div
                  className="absolute top-8 right-2 bg-white shadow-xl rounded-lg py-2 z-20 min-w-[120px] border border-slate-200"
                  ref={menuRef}
                >
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left transition-colors duration-200"
                    onClick={() => renameVectorStore(vectorstore)}
                  >
                    <FaEdit className="w-3 h-3" /> Rename
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                    onClick={() => deleteVectorStore(vectorstore.store_id)}
                  >
                    <FaTrash className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!vectorStores || vectorStores.length === 0) && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDatabaseIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">
              No Vector Databases
            </h3>
            <p className="text-slate-600 font-Archivo text-sm leading-relaxed max-w-md mx-auto mb-6">
              Create your first vector database from organized files to enable intelligent AI interactions in the playground.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D859A] hover:bg-[#D4DB33] text-white hover:text-black rounded-xl font-Archivo font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaPlus className="w-4 h-4" />
              Create Database
            </button>
          </div>
        )}
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
