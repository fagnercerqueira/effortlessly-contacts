import { createContext } from 'react';
import { ContactContextType } from '../types/contact-type';

  
export const ContactContext = createContext<ContactContextType | undefined>(undefined);