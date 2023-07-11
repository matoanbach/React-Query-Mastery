import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import customFetch from "./utils";
import { useEditTask, useDeleteTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
  const MyQueryClient = useQueryClient();
  const { editTask } = useEditTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();

  function handleDelete() {
    deleteTask(
      { taskId: item.id },
      {
        onSuccess: () => {
          console.log("deleted successfully");
          MyQueryClient.invalidateQueries({ queryKey: "tasks" });
        },
        onError: () => {
          console.log("error occurring when deleting.!");
        },
      }
    );
  }

  function handleEdit() {
    editTask(
      { taskId: item.id, isDone: !item.isDone },
      {
        onSuccess: () => {
          console.log("edited successfully");
          MyQueryClient.invalidateQueries({ queryKey: "tasks" });
        },
        onError: () => {
          console.log("error occurring when editing.!");
        },
      }
    );
  }
  return (
    <div className="single-item">
      <input type="checkbox" checked={item.isDone} onChange={handleEdit} />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteTaskLoading}
        onClick={handleDelete}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
