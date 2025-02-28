import { useState } from 'react';

import { ContactContext } from '../context/contact-context';
import { Contact } from '../types/contact-type';

type Props = {
    children: React.ReactNode;
};

export function ContactProvider({ children }: Props) {

  const [contactList, setContacts] = useState<Array<Contact>>([]);


  return <ContactContext.Provider value={contactList}>{children}</ContactContext.Provider>;
}
