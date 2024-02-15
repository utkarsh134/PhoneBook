import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
// import useDisclouse from "../hooks/useDisclouse";

import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  // const { isOpen, onOpen, onClose } = useDisclouse();
  const addContact = async (contact) => {
    try {
      if (contact.name === "" || contact.email === "") return;
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      if (contact.name === "" || contact.email === "") return;
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) =>
            isUpdate ? updateContact(values, contact.id) : addContact(values)
          }
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name </label>
              <Field name="name" type="text" className="border h-10" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email </label>
              <Field name="email" type="email" className="border h-10" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button
              className=" px-3 py-1.5 border bg-[#FCCA3F] self-end"
              type="submit"
            >
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
