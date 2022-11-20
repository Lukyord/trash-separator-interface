import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Airtable from "airtable";

import NavBar from "./components/layout/NavBar";
import BinCapacity from "./pages/BinCapacity";
import DataForEachUser from "./pages/DataForEachUser";
import Time from "./pages/Time";
import TotalTrash from "./pages/TotalTrash";

function App() {
  const base = new Airtable({ apiKey: "keyIn2sbziVDlZX0Y" }).base(
    "appU9C0WFvaOmqpT3"
  );

  const [users, setUser] = useState([]);
  const [trashTimes, setTrashTime] = useState([]);
  const [trashPercentages, setTrashPercentage] = useState([]);

  useEffect(() => {
    base("database-id")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setUser(records);
        console.log(records);
        fetchNextPage();
      });
    base("trash-time")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setTrashTime(records);
        console.log(records);
        fetchNextPage();
      });
    base("trash-percentage")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setTrashPercentage(records);
        console.log(records);
        fetchNextPage();
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<TotalTrash key={users.id} users={users} />} />
        <Route
          path="/time"
          element={<Time key={trashTimes.id} trashTimes={trashTimes} />}
        />
        <Route
          path="/data-for-each-user"
          element={<DataForEachUser key={users.id} users={users} />}
        />
        <Route
          path="/bin-capacity"
          element={
            <BinCapacity
              key={trashPercentages.id}
              // can={trashPercentages.filter(
              //   (percent) => percent.fields.Name[0] === "can trash"
              // )}
              // bottle={trashPercentages.filter(
              //   (percent) => percent.fields.Name[0] === "bottle trash"
              // )}
              percentages={trashPercentages}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
