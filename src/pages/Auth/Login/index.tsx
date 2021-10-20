import { useCallback } from "react";
import {
  Flex,
  Heading,
  Button,
  Stack,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactDomLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../../components/Form/Input";
import { useIndexedDB } from "../../../context/IndexedDBContext";
import { AUTHENTICATE_USER_DATA } from "../../../utils/constants";
import { useAuth } from "../../../context/Auth";

type SignInFormData = {
  username: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  username: yup.string().required("Usuario obligatorio"),
  password: yup.string().required("Password obligatorio"),
});

function Login() {
  const { login } = useAuth();
  const { users } = useIndexedDB();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = useCallback(
    async (values) => {
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            const userExist = users.find(
              (user) =>
                user.username === values.username &&
                user.password === values.password
            );

            if (!userExist) {
              reject("Usuario o contraseña incorrecta");
              return;
            }

            resolve(userExist);
            window.localStorage.setItem(
              AUTHENTICATE_USER_DATA,
              JSON.stringify(userExist)
            );
            login(userExist);
          }, 2000);
        });
      } catch (error) {
        toast({
          title: "Error!",
          description: error as string,
          position: "top-right",
          isClosable: true,
          status: "error",
        });
      }
    },
    [users]
  );

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        direction="column"
        background="gray.100"
        p={8}
        rounded={8}
        width="100%"
        maxWidth={360}
        bg="gray.800"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Heading mb={6} alignSelf="center">
          Ingresar
        </Heading>
        <Stack spacing="4">
          <Input
            type="text"
            label="Usuario"
            placeholder="Ingrese su usuario"
            error={errors.username}
            {...register("username")}
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Ingrese su usuario"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          colorScheme="pink"
          mt="6"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Ingresar
        </Button>

        <Link as={ReactDomLink} to="/register" alignSelf="center" mt={6}>
          <Text fontSize="sm">Si no tienes una cuenta registrate aquí.</Text>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Login;
