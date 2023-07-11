import { useQuery } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
import customFetch from "./utils";
import { useFetchData } from "./reactQueryCustomHooks";
const Items = ({ items }) => {
  const {data, isError, isLoading} = useFetchData();
  if (isLoading) {
    return <p style={{ marginTop: "1rem " }}>Loading...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: "1rem " }}>There was an error...</p>;
  }
  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
