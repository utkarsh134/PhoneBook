import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./Modal";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
      toast.success("Contact deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclouse();

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between bg-[#FFEAAE] p-2 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <HiOutlineUserCircle className="text-[#FCCA3F] text-4xl" />
          <div className="flex flex-col text-sm font-medium ">
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex text-2xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            className="text-blue-700 cursor-pointer"
            onClick={(e) => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
