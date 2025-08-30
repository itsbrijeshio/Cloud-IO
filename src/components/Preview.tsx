import { useEffect } from "react";
import { useMutateApi } from "../hooks";

const Preview = () => {
  const id = location.href?.split("#")[1];
  const { mutate, data } = useMutateApi(["preview", id]);

  useEffect(() => {
    if (id) mutate({ url: `/files/${id}`, method: "get" });
  }, [mutate, id]);

  return (
    <dialog id="preview_model" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="card bg-base-100 w-full mt-5 shadow-sm">
          <figure>
            <img src={data?.storagePath} alt={data?.name} />
          </figure>
        </div>
      </div>
    </dialog>
  );
};

export default Preview;
