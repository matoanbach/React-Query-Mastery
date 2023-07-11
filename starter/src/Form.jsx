import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { useCreateTask } from "./reactQueryCustomHooks";
const Form = () => {
  const [newItemName, setNewItemName] = useState("");
  const MyQueryClient = useQueryClient();
  const {createTask, createTaskLoading} = useCreateTask()
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({taskTitle: newItemName}, {
      onSuccess: () => {
        console.log("created successfully");
        MyQueryClient.invalidateQueries({ queryKey: "tasks" });
        setNewItemName("");
      },
      onError: () => {
        console.log("error occurring when creating task.!");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn">
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
