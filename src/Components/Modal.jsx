import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="backdrop-blur w-screen h-screen absolute top-0 z-40 grid place-items-center">
          <div
            className="text-black min-w-[25%] min-h-[200px] bg-white p-4 relative z-50 m-auto "
          >
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer "
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
