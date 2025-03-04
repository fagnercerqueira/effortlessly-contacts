import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
    nome: Yup.string().required('Campo requerido'),
    cpf: Yup.string().required('Campo requerido'),
    email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Digite um e-mail válido com @ e domínio'
    )
    .required('O e-mail é obrigatório'),
    telefone: Yup.string().required('Campo requerido'),
    cep: Yup.string().matches(/^\d{5}-?\d{3}$/, "CEP inválido. Use o formato 00000-000.").required('Campo requerido'),
    logradouro: Yup.string().required('Campo requerido'),
    numero: Yup.string().required('Campo requerido'),
    complemento: Yup.string().required('Campo requerido'),
    bairro: Yup.string().required('Campo requerido'),
    cidade: Yup.string().required('Campo requerido'),
    estado: Yup.string().required('Campo requerido'),
});
