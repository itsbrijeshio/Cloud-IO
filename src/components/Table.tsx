import { useId, type ReactNode } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdFolder } from "react-icons/io";
import { LuFile } from "react-icons/lu";
import formatDate from "../utils/formatDate";
import formatBytes from "../utils/formatBytes";
import { BsTrash } from "react-icons/bs";
import { useMutateApi } from "../hooks";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useStore from "../store";
import Preview from "./Preview";
import useAuth from "../context/useAuth";

const Option = ({ _id, isFile }: { _id: string; isFile: boolean }) => {
  const { setAction } = useStore();
  const id = useId();
  const { mutate, isPending } = useMutateApi(["delete_resource"], {
    onSuccess: () => {
      toast.success("Resource delete successfully.");
      setAction({
        id,
      });
    },
  });

  const handleOnDelete = () => {
    const path = isFile ? "files" : "folders";
    mutate({
      url: `/${path}/${_id}`,
      method: "delete",
    });
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button className="btn btn-sm btn-ghost btn-circle">
        <CiMenuKebab size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-32 p-2 shadow-sm gap-2"
      >
        <li>
          <button onClick={handleOnDelete} disabled={isPending}>
            <BsTrash className="text-error" size={15} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

const TData = (props: {
  _id: string;
  name: string;
  updatedAt: string;
  owner: string;
  size: number;
}) => {
  const { user } = useAuth();
  const { _id, name, updatedAt, owner = "me", size } = props;
  const handleOnPreview = () => {
    (
      document.getElementById("preview_model") as unknown as Record<
        string,
        () => void
      >
    )?.showModal();
  };

  return (
    <tr id={_id} className="group">
      <td className="flex items-center gap-2">
        {size ? (
          <Link
            to={`#${_id}`}
            className="flex items-center gap-2 cursor-pointer hover:link"
          >
            <LuFile size={20} />
            <span className="line-clamp-1 w-40 " onClick={handleOnPreview}>
              {name}
            </span>
          </Link>
        ) : (
          <>
            <IoMdFolder size={20} />
            <Link to={`/dashboard/${_id}`} className="line-clamp-1 w-40">
              {name}
            </Link>
          </>
        )}
      </td>
      <td>{formatDate(updatedAt)}</td>
      <td>
        <div className="avatar avatar-placeholder flex items-center gap-2">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-md">{user?.name?.charAt(0)}</span>
          </div>
          <span>{owner}</span>
        </div>
      </td>
      <td>{size ? formatBytes(size) : "__"}</td>
      <td>
        <Option _id={_id} isFile={!!size} />
      </td>
    </tr>
  );
};

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-x-auto overflow-y-scroll h-[calc(100vh-150px)]">
      <table className="table  table-pin-rows ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Modified</th>
            <th>Owner</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <Preview />
    </div>
  );
};

Table.TData = TData;
export default Table;
