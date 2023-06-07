import { useEffect } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

function App() {
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/`);
      console.log(res);
    };

    getData();
  }, []);
  return <>hi there</>;
}

export default App;
