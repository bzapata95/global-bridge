import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { App } from "./App";
import { theme } from "./styles/theme";

render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
