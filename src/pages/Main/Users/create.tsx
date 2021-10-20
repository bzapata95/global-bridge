import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, ChangeEvent } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "../../../components/Layout";
import { Input } from "../../../components/Form/Input";
import {
  useUsers,
  RegisterUserFormData,
  createUserFormSchema,
} from "../../../hooks/useUsers";

interface ICountry {
  name: string;
  code: string;
  dial_code: string;
}

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { createUser } = useUsers();

  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((response) => response.json())
      .then((response) => setCountries(response.data));
  }, []);

  const handleCreateUser: SubmitHandler<RegisterUserFormData> = (values) => {
    createUser(values, "/users");
  };

  function handleSelectedCountry(event: ChangeEvent<HTMLSelectElement>) {
    const findCountry = countries.find(
      (country) => country.code === event.target.value
    )!;
    setValue("dial_code", findCountry.dial_code);
  }

  return (
    <Layout>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Heading size="lg" fontWeight="normal">
          Crear usuario
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="text"
              label="Nombres"
              placeholder="Ingrese nombre completo"
              autoComplete="off"
              error={errors.first_name}
              {...register("first_name")}
            />
            <Input
              type="text"
              label="Apellidos"
              placeholder="Ingrese apellidos completo"
              autoComplete="off"
              error={errors.last_name}
              {...register("last_name")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["8"]} w="100%">
            <FormControl>
              <FormLabel htmlFor="country">País</FormLabel>
              <Select
                id="country"
                variant="filled"
                placeholder="Seleccione su país"
                focusBorderColor="pink.500"
                autoComplete="off"
                bgColor="gray.900"
                _hover={{ bgColor: "gray.900" }}
                size="lg"
                {...register("country")}
                onChange={handleSelectedCountry}
              >
                {countries.map((country) => (
                  <option
                    style={{ background: "#1F2029" }}
                    key={country.code}
                    value={country.code}
                  >
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Input
              type="text"
              label="Código"
              placeholder="--"
              isReadOnly
              autoComplete="off"
              {...register("dial_code")}
            />
            <Input
              type="tel"
              label="Número celular"
              placeholder="999 999 999"
              autoComplete="off"
              error={errors.phone}
              {...register("phone")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="text"
              label="Dirección"
              placeholder="Ingrese su dirección"
              autoComplete="off"
              error={errors.address}
              {...register("address")}
            />

            <Input
              type="date"
              label="Fecha de nacimiento"
              placeholder="Ingresar fecha de nacimiento"
              autoComplete="off"
              error={errors.birthdate}
              {...register("birthdate")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="text"
              label="Usuario"
              placeholder="Ingrese un usuario"
              autoComplete="off"
              error={errors.username}
              {...register("username")}
            />
            <Input
              type="password"
              label="Contraseña"
              placeholder="Ingresar contraseña"
              autoComplete="off"
              error={errors.password}
              {...register("password")}
            />
            <Input
              type="password"
              label="Repetir contraseña"
              placeholder="Ingresar nuevamente la contraseña"
              autoComplete="off"
              error={errors.password_confirmation}
              {...register("password_confirmation")}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link to="/users">
              <Button as="a" colorScheme="whiteAlpha">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
              Guardar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Layout>
  );
}
