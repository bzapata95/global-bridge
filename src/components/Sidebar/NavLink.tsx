import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import { NavLink as ReactDomNavLink } from "react-router-dom";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ChakraLink
      as={ReactDomNavLink}
      to={href}
      display="flex"
      align="center"
      _activeLink={{ color: "pink" }}
      exact
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
  );
}
