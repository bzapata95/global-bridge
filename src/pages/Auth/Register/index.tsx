import {
  Flex,
  Heading,
  Button,
  Stack,
  Link,
  Text,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { Link as ReactDomLink } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "../../../components/Form/Input";
import {
  createUserFormSchema,
  RegisterUserFormData,
  useUsers,
} from "../../../hooks/useUsers";

interface ICountry {
  name: string;
  code: string;
  dial_code: string;
}

function Register() {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const { createUser } = useUsers();

  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((response) => response.json())
      .then((response) => setCountries(response.data));
  }, []);

  const handleSignUp: SubmitHandler<RegisterUserFormData> = useCallback(
    async (values) => {
      createUser(values);
    },
    []
  );

  function handleSelectedCountry(event: ChangeEvent<HTMLSelectElement>) {
    const findCountry = countries.find(
      (country) => country.code === event.target.value
    )!;
    setValue("dial_code", findCountry.dial_code);
  }

  return (
    <Flex height="100%" p="20px" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        direction="column"
        background="gray.100"
        p={8}
        rounded={8}
        width="100%"
        maxWidth={360}
        bg="gray.800"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Heading mb={6} alignSelf="center">
          Registro
        </Heading>
        <Stack spacing="4">
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

          <Select
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

          <Flex align="center" justifyContent="space-between" gridGap={4}>
            <Input
              type="text"
              label="Código"
              placeholder="--"
              widthContainer="60%"
              isReadOnly
              autoComplete="off"
              {...register("dial_code")}
            />
            <Input
              type="tel"
              label="Número celular"
              placeholder="999 999 999"
              widthContainer="100%"
              autoComplete="off"
              error={errors.phone}
              {...register("phone")}
            />
          </Flex>

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
        </Stack>
        <Button
          type="submit"
          colorScheme="pink"
          mt="6"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Registrarse
        </Button>

        <Link as={ReactDomLink} to="/login" alignSelf="center" mt={6}>
          <Text fontSize="sm">Si ya tienes una cuenta, ingresa aquí.</Text>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Register;
