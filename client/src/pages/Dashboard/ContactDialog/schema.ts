import * as Yup from 'yup';


export const FormSchema = Yup.object().shape({
    id: Yup.string().required('Is required'),
    name: Yup.string().required('Is required'),
    cpf: Yup.string().required('Is required'),
    email: Yup.string().required('Is required'),
    phone: Yup.string().required('Is required'),
    cep: Yup.number().required('Is required'),
    logradouro: Yup.string().required('Is required'),
    numero: Yup.string().required('Is required'),
    complemento: Yup.string().required('Is required'),
    bairro: Yup.string().required('Is required'),
    cidade: Yup.string().required('Is required'),
    estado: Yup.string().required('Is required'),
    latitude: Yup.number().required('Is required'),
    longitude: Yup.number().required('Is required'),
});
