import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import TopTracks from "./Components/TopTracks";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Swiping from "./Components/Swiping";
import Tracklist from "./Components/TrackList";

config.autoAddCss = false;
function App() {
  const [token, setToken] = useState("");

  const getToken = async () => {
    const response = await fetch("/auth/token");
    const json = await response.json();
    setToken(json.access_token);
  };

  useEffect(() => {
    getToken();
  }, []);

  // return <div>{token === "" ? <Login /> : <Swiping token={token} />}</div>;
  return (
    <div>
      <Swiping token="adss" />
    </div>
  );
  // return <div>{token === "" ? <Login /> : <TopTracks token={token} />}</div>;
}

export default App;
