import * as Yup from "yup";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%¨&*()])[A-Za-z\d!@#$%¨&*()]{8,}$/;

export interface LoginForm {
  name: string;
  email: string;
  password: string;
  passwordMatch?: string;
}

export const registrationScheme = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Escolha um nome de usuário.")
    .min(6, "Nome precisa ter pelo menos 6 caracteres"),

  email: Yup.string()
    .trim()
    .required("Preencha o email")
    .email("Email invalido"),
  password: Yup.string()
    .trim()
    .required("Senha é obrigatória.")
    .min(
      8,
      "Senha deve conter pelo menos 8 caracteres, uma minúscula, uma maiúscula, um número e um caracter espedial."
    )
    .matches(
      regex,
      "Senha fraca, deve conter pelo menos uma minúscula, uma maiúscula, um número e um caracter espedial"
    ),
  passwordMatch: Yup.string().oneOf(
    [Yup.ref("password")],
    "As senhas não conferem!"
  ),
});

export const loginScheme = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Preencha o email")
    .email("Email invalido"),
  password: Yup.string().trim().required("Preencha a sua senha."),
});

export const formScheme: LoginForm = {
  email: "",
  name: "",
  password: "",
  passwordMatch: "",
};
