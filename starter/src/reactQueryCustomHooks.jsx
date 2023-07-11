import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
export const useFetchData = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
          const { data } = await customFetch.get("/");
          return data;
        },
      });
    return {data, isError, isLoading};
}

export const useEditTask = () => {
    const {mutate: editTask} = useMutation({
        mutationFn: ({taskId, isDone}) => {
            return customFetch.patch(`${taskId}`, {isDone})
        }
    })
    return {editTask};
}

export const useDeleteTask = () => {
    const {mutate: deleteTask, isLoading: deleteTaskLoading} = useMutation({
        mutationFn: ({taskId}) => {
            return customFetch.delete(`${taskId}`)
        }
    });
    return {deleteTask, deleteTaskLoading};
}

export const useCreateTask = () => {
    const {mutate: createTask, isLoading: createTaskLoading} = useMutation({
        mutationFn: ({taskTitle}) => {
            return customFetch.post("/", {title: taskTitle})
        }
    })
    return {createTask, createTaskLoading};
}