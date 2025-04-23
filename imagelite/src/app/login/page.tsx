"use client";
import { Button, InputText, Template, useNotification } from "@/components";
import { Eye } from "@/components/eye";
import { Utils } from "@/utils/utils";
import { useState } from "react";
import {
  LoginForm,
  formScheme,
  loginScheme,
  registrationScheme,
} from "./formScheme";
import { useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import {
  AccessToken,
  Credentials,
  User,
} from "@/resources/user/users.resources";
import { boolean } from "yup";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [newUserState, setNewUserState] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const [openEye, setOpenEye] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passErr, setPassErr] = useState<boolean>(false);
  const [passMatchErr, setPassMatchErr] = useState<boolean>(false);
  const countToCloseTheEye: number = 5;
  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();
  const { values, handleChange, handleSubmit, errors, resetForm } =
    useFormik<LoginForm>({
      initialValues: formScheme,
      validationSchema: newUserState ? registrationScheme : loginScheme,
      onSubmit: onSubmit,
    });

  async function onSubmit(values: LoginForm) {
    setLoading(true);
    if (!newUserState) {
      const credentials: Credentials = {
        email: values.email,
        password: values.password,
      };
      try {
        const accessToken: AccessToken = await auth.authenticate(credentials);
        auth.initSession(accessToken)
        auth.isSessionValid();
        router.push("/galery");
      } catch (error: any) {
        const message = error?.message;
        notification.notify(message, "error");
      }
    } else {
      const user: User = {
        email: values.email,
        name: values.name,
        password: values.password,
      };
      try {
        await auth.saveUser(user);
        notification.notify("Usuário criado com sucesso!", "success");
        resetForm();
        setNewUserState(false);
      } catch (error: any) {
        const message = error?.message;
        notification.notify(message, "error");
      }
    }
    setLoading(false);
  }
  const showOrHidePass = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));

    setOpenEye((prevOpenEye) => {
      if (!prevOpenEye) {
        setTimeout(() => {
          setInputType("password");
          setOpenEye(false);
        }, countToCloseTheEye * 1000);
      }
      return !prevOpenEye;
    });
  };
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateInputData(e);
    handleChange(e);
  }
  function validateInputData(e: React.ChangeEvent<HTMLInputElement> | any) {
    const isClick =
      (e.relatedTarget && e.relatedTarget.innerText.includes("Conta")) ||
      (e.relatedTarget && e.relatedTarget.innerText.includes("Voltar"));

    if (!isClick) {
      const inputName = e.currentTarget.id;
      const inputValue = e.target.value;

      (inputName === "name" && errors.name) ||
      (inputName === "name" && inputValue === "")
        ? setNameErr(true)
        : setNameErr(false);
      (inputName === "email" && errors.email) ||
      (inputName === "email" && inputValue === "")
        ? setEmailErr(true)
        : setEmailErr(false);
      (inputName === "password" && errors.password) ||
      (inputName === "password" && inputValue === "")
        ? setPassErr(true)
        : setPassErr(false);
      (inputName === "passwordMatch" && errors.passwordMatch) ||
      (inputName === "passwordMatch" && inputValue === "")
        ? setPassMatchErr(true)
        : setPassMatchErr(false);
    }
  }
  function handleOnSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    errors.name ? setNameErr(true) : setNameErr(false);
    errors.email ? setEmailErr(true) : setEmailErr(false);
    errors.password ? setPassErr(true) : setPassErr(false);
    // errors.passwordMatch ? setPassMatchErr(true) : setPassMatchErr(false);

    handleSubmit();
  }
  function handleUserState(bool: boolean) {
    setNewUserState(bool);
    setNameErr(false);
    setEmailErr(false);
    setPassMatchErr(false);
    setPassErr(false);
  }
  return (
    <Template loading={loading}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            {newUserState ? "Crie sua conta" : "Entre em sua conta"}
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm  relative">
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <Utils.renderIf condition={newUserState}>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium leading-6 ${
                    nameErr ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  Nome:
                </label>
                <InputText
                  style="w-full"
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  error={nameErr}
                  errMessage={errors.name}
                />
              </div>
            </Utils.renderIf>
            <div className="mt-2">
              <label
                className={`block text-sm font-medium leading-6 ${
                  emailErr ? "text-red-600" : "text-gray-900"
                }`}
              >
                Email:
              </label>
              <InputText
                style="w-full"
                id="email"
                type="text"
                value={values.email}
                onChange={handleOnChange}
                onBlur={handleOnChange}
                error={emailErr}
                errMessage={errors.email}
              />
            </div>
            <div className="mt-2">
              <label
                className={`block text-sm font-medium leading-6 ${
                  passErr ? "text-red-600" : "text-gray-900"
                }`}
              >
                Senha:
              </label>
              <InputText
                style="w-full"
                id="password"
                type={inputType}
                value={values.password}
                onChange={handleOnChange}
                onBlur={handleOnChange}
                error={passErr}
                errMessage={errors.password}
              />
            </div>
            <Utils.renderIf condition={newUserState}>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium leading-6 ${
                    passMatchErr ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  Repetir Senha:
                </label>
                <InputText
                  style="w-full"
                  id="passwordMatch"
                  type={inputType}
                  value={values.passwordMatch}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  error={passMatchErr}
                  errMessage={errors.passwordMatch}
                />
              </div>
            </Utils.renderIf>
            <div>
              <Utils.renderIf condition={newUserState}>
                <Button type="submit" color="blue" text="Criar" />
                <Button
                  type="button"
                  color="cancel"
                  text="Voltar ao Login"
                  style="mx-4"
                  onClick={(event) => handleUserState(false)}
                />
              </Utils.renderIf>
              <Utils.renderIf condition={!newUserState}>
                <Button type="submit" color="blue" text="Login" />
                <Button
                  type="button"
                  color="red"
                  text="Criar Conta"
                  style="mx-4"
                  onClick={(event) => handleUserState(true)}
                />
              </Utils.renderIf>
            </div>
            <div className="absolute right-0 bottom-10">
              <Eye
                onClick={showOrHidePass}
                isPlural={newUserState}
                openEye={openEye}
                countToCloseTheEye={countToCloseTheEye}
              />
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}

export let isRegister: boolean = false;
