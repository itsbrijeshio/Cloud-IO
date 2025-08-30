import { useId, useRef, type ReactNode } from "react";
import { FiPlus } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { NavLink, useParams } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { PiTrash } from "react-icons/pi";
import { BsCloudyFill } from "react-icons/bs";
import useAuth from "../context/useAuth";
import formatBytes from "../utils/formatBytes";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { useFormik } from "formik";
import { useMutateApi } from "../hooks";
import { toast } from "react-toastify";
import useStore from "../store";
import { VscLoading } from "react-icons/vsc";

const NewUploadModel = () => {
  const { resource_id } = useParams();
  const { setAction } = useStore();
  const id = useId();
  const btnCloseRef = useRef<HTMLButtonElement | null>(null);
  const { mutate, isPending } = useMutateApi(["new-upload"], {
    onSuccess: () => {
      toast.success(`File uploaded.`);
      if (btnCloseRef?.current) {
        btnCloseRef.current?.click();
      }
      setAction({
        id,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      if (!values.file) return;

      const id = resource_id ? resource_id : "";
      const formData = new FormData();
      formData.append("file", values.file);

      if (id) formData.append("folder", id);

      mutate({
        url: "/files",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
    },
  });

  return (
    <>
      <dialog id="new_upload_model" className="modal">
        <div className="modal-box w-96">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              ref={btnCloseRef}
            >
              ✕
            </button>
          </form>

          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">New Upload</legend>
              <small className="text-warning text-xs">
                Only image files are allowed
              </small>
              <input
                type="file"
                name="file"
                className="file-input"
                required
                onChange={(e) => {
                  if (!e.target?.files) return;
                  const file = e.target?.files[0];
                  formik.setFieldValue("file", file);
                }}
              />
            </fieldset>
            <button
              disabled={isPending}
              type="submit"
              className="btn btn-primary disabled:cursor-not-allowed"
            >
              {isPending ? (
                <VscLoading className="animate animate-spin" size={20} />
              ) : (
                "Upload"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

const NewFolderModel = () => {
  const { resource_id } = useParams();
  const { setAction } = useStore();
  const id = useId();
  const btnCloseRef = useRef<HTMLButtonElement | null>(null);

  const { mutate, isPending } = useMutateApi(["new-folder"], {
    onSuccess: () => {
      toast.success(`'${formik.values.name}' folder created.`);
      if (btnCloseRef?.current) {
        btnCloseRef.current?.click();
      }
      setAction({
        id,
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "Untitled folder",
    },
    onSubmit: (data) => {
      const values: { name: string; parent?: unknown } = { name: data.name };

      const id = resource_id ? resource_id : "";
      if (id) values.parent = id;

      mutate({
        url: "/folders",
        method: "post",
        data: values,
      });
    },
  });
  return (
    <>
      <dialog id="new_folder_model" className="modal">
        <div className="modal-box w-96">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              ref={btnCloseRef}
            >
              ✕
            </button>
          </form>
          <form onSubmit={formik.handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">New Folder</legend>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="New Folder"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </fieldset>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary"
            >
              {isPending ? (
                <VscLoading className="animate animate-spin" size={20} />
              ) : (
                "New"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

const Dropdown = () => {
  const handleOnNewFolder = () => {
    (
      document.getElementById("new_folder_model") as unknown as Record<
        string,
        () => void
      >
    )?.showModal();
  };

  const handleOnNewUpload = () => {
    (
      document.getElementById("new_upload_model") as unknown as Record<
        string,
        () => void
      >
    )?.showModal();
  };

  return (
    <div className="dropdown">
      <button className="flex items-center gap-2 bg-base-300 px-5 py-4 rounded-2xl shadow-xl hover:bg-white/5 cursor-pointer">
        <FiPlus size={20} />
        <span className="text-sm">New</span>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm mt-2 gap-2"
      >
        <li>
          <a className="gap-3" onClick={handleOnNewUpload}>
            <VscNewFile size={20} />
            <span>New upload</span>
          </a>
        </li>
        <li>
          <a className="gap-3" onClick={handleOnNewFolder}>
            <VscNewFolder size={20} />
            <span>New folder</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const ItemLink = ({
  children,
  to = "",
  tip = "",
}: {
  children: ReactNode;
  to?: string;
  tip?: string;
}) => {
  return (
    <li className="tooltip w-full" data-tip={tip}>
      <NavLink
        onClick={(e) => (to == "" ? e.preventDefault() : null)}
        to={to}
        className={({ isActive }) =>
          `w-full flex items-center justify-start gap-3 pl-5 py-3  rounded-full 
        ${to == "" ? "cursor-not-allowed" : "cursor-pointer"}
        text-sm ${isActive ? "bg-primary" : "hover:bg-white/5"}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  const { user } = useAuth();
  const perStorageUsed =
    user && ((user.storageUsed / user.storageQuota) * 100).toFixed(2);

  return (
    <aside className="fixed w-64 h-[calc(100vh-60px)] flex flex-col gap-4 p-4">
      <Dropdown />
      <div>
        <ul className="flex flex-col gap-1">
          <ItemLink to="/dashboard">
            <GoHomeFill size={20} />
            <span>Dashboard</span>
          </ItemLink>
          <ItemLink to="" tip="Upcoming">
            <FaRegStar size={20} />
            <span>Starred</span>
          </ItemLink>
          <ItemLink to="" tip="Upcoming">
            <RiTimeLine size={20} />
            <span>Recent</span>
          </ItemLink>
          <ItemLink to="" tip="Upcoming">
            <PiTrash size={20} />
            <span>Bin</span>
          </ItemLink>
        </ul>
      </div>
      <div>
        <ul>
          <ItemLink to="" tip="Upcoming">
            <BsCloudyFill size={20} />
            <span>Storage</span>
          </ItemLink>
          <li className="pl-5 mt-5">
            <div className="w-full rounded-full bg-base-300 border border-white/10 overflow-hidden">
              <div
                style={{ width: `${perStorageUsed}%` }}
                className={`py-0.5 bg-primary rounded-full`}
              ></div>
            </div>
            <div>
              <span className="text-sm opacity-50">
                {user && formatBytes(user.storageUsed)} of{" "}
                {user && formatBytes(user.storageQuota)} used
              </span>
            </div>
          </li>
        </ul>
      </div>
      <NewUploadModel />
      <NewFolderModel />
    </aside>
  );
};

export default Sidebar;
