"use client";
import { Button, InputText, Template, SpanError } from "@/components";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Utils } from "@/utils/utils";
import { useImageService } from "@/resources/image/image.service";
import { Tooltip } from "@nextui-org/tooltip";
import { useNotification } from "@/components/notification";
import Link from "next/link";
import {
  FormProps,
  formsScheme,
  formValidationSchema,
  errorMessages,
} from "./formSchema";

export default function FormPage() {
  const notification = useNotification();
  const [imagePreview, setImagePreview] = useState<string>();
  const [alt, setAlt] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const useSerice = useImageService();
  const [nameError, setNameError] = useState<boolean>(false);
  const [tagError, setTagError] = useState<boolean>(false);

  const formik = useFormik<FormProps>({
    initialValues: formsScheme,
    onSubmit: handleSubmit,
    validationSchema: formValidationSchema,
  });
  useEffect(() => {
    setNameError(false);
    setTagError(false);
  }, []);

  function validateInputData(e: React.ChangeEvent<HTMLInputElement>) {
    const inputId = e.target.id;
    if (e.target.value === "") {
      inputId === "name" ? setNameError(true) : setTagError(true);
    } else {
      inputId === "name" ? setNameError(false) : setTagError(false);
    }
  }

  function handleOnBlur(e: React.ChangeEvent<HTMLInputElement>) {
    validateInputData(e);
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateInputData(e);
    formik.handleChange(e);
  }
  async function handleSubmit(data: FormProps) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("tags", data.tags);
    await useSerice.postImage(formData);

    formik.resetForm();
    setImagePreview("");
    setAlt("");

    notification.notify("Image successfuly uploaded", "success");
  }

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      formik.setFieldValue("file", file);
      const imageURL = URL.createObjectURL(file);
      setAlt(event.target.files[0].name);
      setImagePreview(imageURL);
    }
  }

  return (
    <Template loading={loading}>
      <section className="flex flex-col items-center justify-center my-5">
        <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">
          New Image
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1">
            <InputText
              placeholder="Type the Image Name"
              type="text"
              id="name"
              name="name"
              label="Name: *"
              value={formik.values.name}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              error={nameError}
            />
          </div>
          <div className="mt-5 grid grid-cols-1">
            <InputText
              placeholder="Tags, comma separated."
              type="text"
              id="tags"
              name="tags"
              label="Tags: *"
              value={formik.values.tags}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              error={tagError}
            />
            <div className="mt-5 grid grid-cols-1">
              <label
                className="block text-sm font-medium leading-6 text-gray-700 font-semibold"
                htmlFor="imageBox"
              >
                Image: *
              </label>
              {formik.errors.file && <SpanError message={errorMessages.file} />}
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <Utils.renderIf condition={!imagePreview}>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Utils.renderIf>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                      <Utils.renderIf condition={!imagePreview}>
                        <span>Click to upload.</span>
                      </Utils.renderIf>
                      <Utils.renderIf condition={!!imagePreview}>
                        <Tooltip
                          showArrow={true}
                          className="capitalize bg-blue-500 font-light text-white rounded-lg text-xs mt-0.5 shadow-md "
                          content={alt}
                          placement="bottom-end"
                          closeDelay={0}
                        >
                          <img
                            src={imagePreview}
                            alt={alt}
                            width={250}
                            className="rounded-md"
                          />
                        </Tooltip>
                      </Utils.renderIf>
                      <input
                        onChange={onFileUpload}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button color="blue" text="Save" type="submit" />
            <Link href="/galery">
              <Button color="cancel" text="Galery" />
            </Link>
          </div>
        </form>
      </section>
    </Template>
  );
}
