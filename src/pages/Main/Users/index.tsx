import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  useBreakpointValue,
  Tbody,
  Td,
  Text,
  Avatar,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Layout } from "../../../components/Layout";
import { useIndexedDB } from "../../../context/IndexedDBContext";

export function Users() {
  const { users } = useIndexedDB();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Layout>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuarios
          </Heading>

          <Button
            as={Link}
            size="sm"
            fontSize="sm"
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            to="/users/create"
          >
            Crear nuevo
          </Button>
        </Flex>

        <Table colorScheme="whiteAlpha" size="sm">
          <Thead>
            <Tr>
              <Th>Estado</Th>
              <Th>Usuario</Th>
              <Th>País</Th>
              {isWideVersion && <Th>Teléfono</Th>}
              {isWideVersion && <Th>Fecha de registro</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Switch size="md" isChecked={Boolean(user.status)} />
                </Td>
                <Td>
                  <HStack>
                    {isWideVersion && (
                      <Avatar name={`${user.first_name} ${user.last_name}`} />
                    )}
                    <Box>
                      <Text fontWeight="bold">
                        {user.first_name} {user.last_name}
                      </Text>
                      <Text fontSize="sm" color="gray.300">
                        {user.username}
                      </Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{user.country_code}</Td>
                {isWideVersion && (
                  <Td>
                    {user.dial_code} {user.phone}
                  </Td>
                )}
                {isWideVersion && (
                  <Td>
                    {new Intl.DateTimeFormat("es-PE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(user.created_at)}
                  </Td>
                )}
                {/* <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    {isWideVersion ? "Editar" : null}
                  </Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* <Pagination /> */}
      </Box>
    </Layout>
  );
}
