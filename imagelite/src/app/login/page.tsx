"use client";
import { Button, InputText, SpanError, Template } from "@/components";
import { Eye } from "@/components/eye";
import { Utils } from "@/utils/utils";
import { useState } from "react";
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { useFormik } from "formik";
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
  const { values, handleChange, handleSubmit, errors, isValid } =
    useFormik<LoginForm>({
      initialValues: formScheme,
      validationSchema: validationScheme,
      onSubmit: onSubmit,
    });

  async function onSubmit(values: LoginForm) {}
  const showOrHidePass = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));

    setOpenEye((prevOpenEye) => {
      console.log(prevOpenEye);
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
    console.log(e);
    handleChange(e);
    console.log(isValid, values);
  }
  function validateInputData(e: React.ChangeEvent<HTMLInputElement>) {
    const inputName = e.currentTarget.id;
    const inputValue = e.target.value;
    console.log(inputName);
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
  return (
    <Template>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            {newUserState ? "Crie sua conta" : "Entre em sua conta"}
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm  relative">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  onClick={(event) => setNewUserState(false)}
                />
              </Utils.renderIf>
              <Utils.renderIf condition={!newUserState}>
                <Button type="submit" color="blue" text="Login" />
                <Button
                  type="button"
                  color="red"
                  text="Criar Conta"
                  style="mx-4"
                  onClick={(event) => setNewUserState(true)}
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
