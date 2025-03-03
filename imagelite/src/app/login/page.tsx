"use client";
import { InputText, Template } from "@/components";
import { Eye } from "@/components/eye";
import { Utils } from "@/utils/utils";
import { useState } from "react";
export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [newUserState, setNewUserState] = useState<boolean>(true);
  const [openOrCloseEye, setOpenOrCloseEye] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const [openEye, setOpenEye] = useState<boolean>(false);
  const showOrHidePass = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
    setOpenEye(inputType === "password" ? false : true);
  };
  return (
    <Template>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Login to Your Account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm  relative">
          <form className="space-y-6">
            <Utils.renderIf condition={newUserState}>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Name:
                </label>
                <InputText style="w-full" id="name" />
              </div>
            </Utils.renderIf>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <InputText style="w-full" id="email" />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password:
              </label>
              <InputText style="w-full" id="password" type={inputType} />
            </div>
            <Utils.renderIf condition={newUserState}>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Repeat Password:
                </label>
                <InputText style="w-full" id="passwordMatch" type={inputType} />
              </div>
            </Utils.renderIf>
            <div className="absolute right-0">
              <Eye
                onClick={showOrHidePass}
                isPlural={newUserState}
                openEye={openEye}
              />
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
