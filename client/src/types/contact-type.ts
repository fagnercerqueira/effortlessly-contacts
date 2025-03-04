export interface Contact {
    id?: string;
    nome: string;
    cpf: string,
    email: string;
    telefone: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    latitude: number;
    longitude: number;
}


export interface ContactContextType{
    pickedContact: Coords | null,
    contactList: Array<Contact>;
    addContact: (contact: Contact) => void;
    removeContact: (id: number) => void;
    setPickedContact: (coords: Coords) => void;
};

export interface Coords{
  lat: number,
  lng: number,
}
