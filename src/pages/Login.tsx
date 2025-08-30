import { Link } from "react-router-dom";
import { SiAdobecreativecloud } from "react-icons/si";
import { useMutateApi } from "../hooks";
import { useFormik } from "formik";

const Login = () => {
  const { mutate, isPending } = useMutateApi(["login"], {
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      mutate({
        url: "/auth/login",
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
        <h2 className="text-3xl font-bold text-white">Good see you again</h2>
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
          name="email"
          className="input bg-white text-neutral w-full"
          placeholder="emma.johnson@example.com"
          required
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          className="input bg-white text-neutral w-full"
          placeholder="***********"
          required
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <div className="text-center text-white">
        <p>
          <span className="opacity-75 me-1">Don't have an account?</span>
          <Link to="/register" className="btn-link text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
