"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type DialogContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const Dialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children }: { children: ReactNode }) => {
  const dialog = useContext(DialogContext);
  if (!dialog) return null;

  return (
    <div
      onClick={() => dialog.setIsOpen(true)}
      className="inline-block cursor-pointer"
    >
      {children}
    </div>
  );
};

export const DialogContent = ({ children }: { children: ReactNode }) => {
  const dialog = useContext(DialogContext);
  if (!dialog || !dialog.isOpen) return null;

  const handleOverlayClick = () => dialog.setIsOpen(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg relative animate-fade-in"
        onClick={(e) => e.stopPropagation()} // prevent close on content click
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black transition"
          onClick={() => dialog.setIsOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
