import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Home from "./Routes/Home";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
};

export default App;
