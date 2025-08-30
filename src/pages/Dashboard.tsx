import { useEffect } from "react";
import { Table } from "../components";
import { useMutateApi } from "../hooks";
import { Link, useParams } from "react-router-dom";
import useStore from "../store";

const Dashboard = () => {
  const { mutate, data } = useMutateApi(["dashboard"]);
  const { resource_id } = useParams();
  const { action } = useStore();

  useEffect(() => {
    const id = resource_id ? resource_id : "";
    mutate({
      url: `/folders/${id}`,
      method: "get",
    });
  }, [mutate, resource_id, action]);

  return (
    <section className="flex flex-col gap-4">
      <div className="pl-3">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to={"/dashboard"}>My Drive</Link>
            </li>
            {data?.folder?.path?.map((path: { _id: string; name: string }) => (
              <li key={path._id}>
                <Link to={`/dashboard/${path._id}`}>{path.name}</Link>
              </li>
            ))}
            {data?.folder && (
              <li>
                <span>{data?.folder.name}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Table>
        {data?.subFolders.map(
          (folder: {
            _id: string;
            name: string;
            updatedAt: string;
            owner: string;
            size: number;
          }) => (
            <Table.TData {...folder} />
          )
        )}

        {data?.files.map(
          (folder: {
            _id: string;
            name: string;
            updatedAt: string;
            owner: string;
            size: number;
          }) => (
            <Table.TData {...folder} />
          )
        )}
      </Table>
    </section>
  );
};

export default Dashboard;
