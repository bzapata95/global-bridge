import { Stack } from "@chakra-ui/react";
import { RiContrastLine, RiDashboardLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink icon={RiDashboardLine} href="/">
          Dashboard
        </NavLink>
        <NavLink icon={RiContrastLine} href="/users">
          Usuarios
        </NavLink>
      </NavSection>
    </Stack>
  );
}
