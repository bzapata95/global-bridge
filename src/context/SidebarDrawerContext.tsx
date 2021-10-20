import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { FC, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

const SidebarDrawerProvider: FC = ({ children }) => {
  const disclosure = useDisclosure();
  const { pathname } = useLocation();

  useEffect(() => {
    disclosure.onClose();
  }, [pathname]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

const useSidebarDrawer = () => {
  const context = useContext(SidebarDrawerContext);
  return context;
};

export { SidebarDrawerProvider, useSidebarDrawer };
