import {
  Flex,
  Box,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  theme,
} from "@chakra-ui/react";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../context/Auth";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  const { logout, user } = useAuth();
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Bryan Zapata</Text>
          <Text color="gray.300" fontSize="small">
            bmzc95@gmail.com
          </Text>
        </Box>
      )}

      <Menu colorScheme="whiteAlpha">
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen}>
              <Avatar size="md" name={`${user.first_name} ${user.last_name}`} />
            </MenuButton>
            <MenuList bg={theme.colors.gray[600]}>
              <MenuGroup title="Perfil">
                <MenuItem
                  bg={theme.colors.gray[600]}
                  _hover={{ bg: theme.colors.gray[800] }}
                  _selected={{ bg: theme.colors.gray[800] }}
                  onClick={logout}
                  icon={<RiCloseLine />}
                >
                  Cerrar sessión
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
}
