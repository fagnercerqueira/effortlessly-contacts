import { useContext } from 'react';
import { ContactContext } from '../context/contact-context';

export const useContactContext = () => {
  const context = useContext(ContactContext);

  if (!context) throw new Error('useContactContext context must be use inside CotnactProvider');

  return context;
};
