import { memo } from "react";
import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { RiMenuLine } from "react-icons/ri";
import { SearchBox } from "./SearchBox";
import { Profile } from "./Profile";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

export const Header = memo(() => {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px={isWideVersion ? "24" : "3"}
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
});
