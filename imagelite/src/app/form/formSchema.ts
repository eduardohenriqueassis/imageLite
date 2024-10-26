import * as Yup from "yup";

export interface FormProps {
  name: string;
  tags: string;
  file: string | Blob;
}

export const formsScheme: FormProps = {
  name: "",
  tags: "",
  file: "",
};
const allowedTypes = ["png", "jpeg", "gif", "webp"];
export const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is mandatory!")
    .max(50, "Max 50 characters!"),
  tags: Yup.string()
    .trim()
    .required("tags are mandatory!")
    .max(50, "Max 50 characters!"),
  file: Yup.mixed<Blob>()
    .required("Select an image.")
    .test("size", "File size cannot be higher than 4MB", (file) => {
      return file.size < 4194304;
    })
    .test("type", "Accepeted formats: jpeg, png, gif, webp", (file) => {
      return allowedTypes.some((type) => file.type === `image/${type}`);
    }),
});

export const errorMessages = {
  name: "Name is mandatory.",
  tags: "Tags are mandatory.",
  file: "No file selected or no allowed format",
};
