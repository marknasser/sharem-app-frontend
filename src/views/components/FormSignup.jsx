import { useState } from "react";
import { Formik } from "formik";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { client } from "../../client";
import { Spinner } from "../components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function FormSignup({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    console.log("Upload image locale", e.target.files);
    console.log("Upload ", URL.createObjectURL(e.target.files[0]));
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          console.log("Upload image internationalll", document);
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => console.log("Image upload error", error));
    } else {
      setWrongImageType(true);
    }
  };
  return (
    <div className="text-sm">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Invalid name";
          }
          if (!values.email) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Invalid password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // const generetedId = new Date().valueOf().toString();
          // const dataWithId = { generetedId, ...values };
          console.log("valllllllllllllllll", values);
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-[1px] border-neutral-400 rounded-md p-1">
              <BsFillPersonFill fontSize={15} className="mr-2 text-red-200" />
              <input
                className="outline-none "
                placeholder="User Name ..."
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </div>

            {errors.name && touched.name && errors.name}
            <div className="flex justify-between items-center border-[1px] border-neutral-400 rounded-md p-1">
              <MdEmail fontSize={15} className="mr-2 text-red-200" />
              <input
                className="outline-none "
                placeholder="Email ..."
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>

            {errors.email && touched.email && errors.email}
            <div className="flex justify-between items-center border-[1px] border-neutral-400 rounded-md p-1">
              <RiLockPasswordFill fontSize={15} className="mr-2 text-red-200" />
              <input
                className="outline-none"
                placeholder="Password ..."
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            {errors.password && touched.password && errors.password}

            <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
              <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-44 h-200">
                {loading && <Spinner />}
                {wrongImageType && <p>Wrong image type</p>}
                {!imageAsset ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl">
                          <AiOutlineCloudUpload />
                        </p>
                        <p className="text-sm">Click to upload</p>
                      </div>
                      <p className="mt-2 text-gray-400 text-center">
                        Recommendation: use high-quality JPG, SVG, PNG, GIF or
                        TIFF less than 20MB{" "}
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset?.url}
                      alt="uploded-pic"
                      className="h-full w-f object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                      onClick={() => setImageAsset(null)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="m-auto bg-[#ef4444] w-fit px-3 py-1 rounded-md font-semibold text-white text-md font-mono ">
              <button type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormSignup;
