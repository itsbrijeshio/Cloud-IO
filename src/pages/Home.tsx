import { SiAdobecreativecloud } from "react-icons/si";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav className="px-5 py-2">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-primary w-64"
          >
            <SiAdobecreativecloud size={35} />
            <strong className="text-xl">Cloud.io</strong>
          </Link>

          <div className="flex items-center gap-3">
            <ul className="menu menu-horizontal">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="max-w-[900px] mx-auto h-[calc(100vh-150px)] flex items-center justify-center my-20 sm:my-0 px-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Your Files, Anywhere, Anytime</h1>
          <p className="py-6">
            Cloud.io is the secure cloud storage solution that lets you store,
            share, and collaborate on files from anywhere. With end-to-end
            encryption and seamless integration across all your devices, your
            data is always safe and accessible.
          </p>
          <div className="w-fit mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 ">
              <Link to="/register" className="btn btn-primary">
                Get Started for Free
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            </div>
            <div className="mt-8 sm:flex items-center mx-auto">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  checked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
              </div>
              <span className="ml-2 block">
                Rated 4.1/5 by over 10,000 users
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer className="sm:fixed bottom-0 left-0 w-full footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Cloud.io
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
