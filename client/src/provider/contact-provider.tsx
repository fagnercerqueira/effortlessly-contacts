import { useState, useMemo } from 'react';
import { ContactContext } from '../context/contact-context';
import { Contact, ContactContextType } from '../types/contact-type';

type Props = {
    children: React.ReactNode;
};


export function ContactProvider({ children }: Props) {
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  const addContact = (contact: Contact) => setContacts((prevContacts) => [...prevContacts, contact]);
  const removeContact = (id: number) => { setContacts((prevContacts) => prevContacts.filter((_, i) => i !== id))};

  const memoizedValue: ContactContextType = useMemo(
    () => ({
        contactList: contacts,
        addContact,
        removeContact,
    }),
    [contacts]
  );

  return <ContactContext.Provider value={memoizedValue}>{children}</ContactContext.Provider>;
}