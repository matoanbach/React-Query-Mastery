import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });
  return { isLoading, data, isError };
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate: createTask, isLoading } = useMutation({
      mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("task added");
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
      },
    });
    return {createTask, isLoading};
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("checked");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("deleted");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { deleteTask, isLoading };
};
