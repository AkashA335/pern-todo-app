import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(["Email", "AuthToken"]);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  console.log(cookies);
  const [tasks, setTasks] = useState(null);
  const [listName, setListName] = useState('🏝️Holiday tick list'); // State for list name

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && 
      <>
        <ListHeader listName={listName} setListName={setListName} getData={getData} />
        {userEmail && <p className="user-email">Welcome back {userEmail}</p>}
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
      <p className="copyright">© Grind 2024</p>
    </div>
  );
};

export default App;
