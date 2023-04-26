import { Formik } from "formik";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function FormLogin({ onSubmit }) {
  return (
    <div className="text-sm">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Invalid password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
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
            <div className="m-auto bg-[#ef4444] w-fit px-3 py-1 rounded-md font-semibold text-white text-md font-mono ">
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div className="w-fit m-auto mt-2 text-xs text-gray-500 font-medium ">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-red-400">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default FormLogin;
