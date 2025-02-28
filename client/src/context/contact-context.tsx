import { createContext } from 'react';
import { Contact } from '../types/contact-type';


export const ContactContext = createContext([] as Array<Contact>);
