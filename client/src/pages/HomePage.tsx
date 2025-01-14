import { useGetListItems } from "@/apis/hooks";

interface ListItem {
  _id: string;
  title: string;
  userName: string;
}

const HomePage = () => {
  const { data } = useGetListItems();
  console.log(data);

  return (
    <div>
      <h1>Home?</h1>
      {data &&
        data.map((item: ListItem) => (
          <div key={item._id}>
            <p>{item.title}</p>
            <p>{item.userName}</p>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
