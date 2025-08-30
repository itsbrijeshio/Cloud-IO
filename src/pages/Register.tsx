import { Link } from "react-router-dom";
import { SiAdobecreativecloud } from "react-icons/si";
import { useMutateApi } from "../hooks";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Register = () => {
  const { mutate, isPending } = useMutateApi(["register"], {
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      mutate({
        url: "/auth/register",
        method: "post",
        data,
      });
    },
  });

  return (
    <section className="w-[350px] text-neutral">
      <div className="text-center">
        <Link to={"/"}>
          <SiAdobecreativecloud className="mx-auto text-primary" size={40} />
        </Link>
        <h2 className="text-3xl font-bold text-white">Create an account</h2>
        <p className="text-base text-white opacity-75">
          Enter your correct credentials
        </p>
      </div>
      <form
        className="flex flex-col gap-3 my-5 w-full"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          name="name"
          className="input bg-white text-neutral w-full"
          placeholder="Emma Johnson"
          required
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="email"
          className="input bg-white text-neutral w-full"
          placeholder="emma.johnson@example.com"
          required
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="password"
          className="input bg-white text-neutral w-full"
          placeholder="***********"
          required
          onChange={formik.handleChange}
        />
        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <div className="text-center text-white">
        <p>
          <span className="me-1 opacity-75"> Already have an account? </span>
          <Link to="/login" className="btn-link text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
