import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { SiAdobecreativecloud } from "react-icons/si";
import { TbSettings } from "react-icons/tb";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-5 py-2">
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-primary w-64"
        >
          <SiAdobecreativecloud size={35} />
          <strong className="text-xl">Cloud.io</strong>
        </Link>

        <form
          className="me-auto tooltip tooltip-bottom"
          data-tip="Upcoming"
          onFocus={(e) => e.preventDefault()}
        >
          <label className="relative" htmlFor="search">
            <IoSearchOutline className="absolute top-0.5 left-3" size={20} />
            <input
              type="text"
              id="search"
              className="w-[500px] indent-5 px-5 py-2.5 rounded-full outline-0 border border-transparent text-sm bg-white/5 focus:bg-base-200 focus:border-white/10 disabled:bg-white/5 disabled:border-white/10 disabled:cursor-not-allowed"
              placeholder="Search Cloud"
              disabled
            />
          </label>
        </form>

        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="btn btn-sm btn-ghost btn-circle tooltip tooltip-left cursor-not-allowed"
            data-tip="Upcoming"
            onClick={(e) => e.preventDefault()}
          >
            <TbSettings size={20} />
          </Link>
          <Link
            to="/settings"
            className="btn btn-sm btn-ghost btn-circle
          tooltip tooltip-left cursor-not-allowed"
            data-tip="Upcoming"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegUser size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
