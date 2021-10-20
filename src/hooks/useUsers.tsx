import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import * as yup from "yup";

import { useIndexedDB } from "../context/IndexedDBContext";

export interface RegisterUserFormData {
  first_name: string;
  last_name: string;
  username: string;
  dial_code: string;
  country: string;
  phone: string;
  password: string;
  password_confirmation: string;
  birthdate: string;
  address: string;
}

export const createUserFormSchema = yup.object().shape({
  first_name: yup.string().required("Nombre obligatorio"),
  last_name: yup.string().required("Nombre obligatorio"),
  username: yup.string().required("Usuario obligatorio"),
  country: yup.string().required("Seleccione su país"),
  phone: yup.string().required("Teléfono obligatorio"),
  birthdate: yup.string().required("Fecha de nacimiento obligatorio"),
  address: yup.string().required("Dirección obligatorio"),
  password: yup
    .string()
    .required("Contraseña obligatoria")
    .min(6, "Mínimo 6 carácteres"),
  password_confirmation: yup
    .string()
    .oneOf(
      [null, yup.ref("password")],
      "Las contraseñas tienen que ser iguales"
    ),
});

export function useUsers() {
  const { users, DB, addedNewUser } = useIndexedDB();
  const history = useHistory();
  const toast = useToast();

  const createUser = useCallback(
    (values: RegisterUserFormData, pathRedirect = "/login") => {
      const existUser = users.find(
        (user) => user.username.toLowerCase() === values.username.toLowerCase()
      );

      if (existUser) {
        toast({
          title: "Aviso!",
          description: "El usuario ya existe!",
          position: "top-right",
          isClosable: true,
          status: "warning",
        });
        return;
      }

      const transaction = DB.current?.transaction(["users"], "readwrite");

      // User data
      const payloadUser = {
        id: uuidV4(),
        created_at: new Date(),
        updated_at: new Date(),
        status: 1,
        username: values.username,
        password: values.password,
        country_code: values.country,
        dial_code: values.dial_code,
        phone: values.phone,
        first_name: values.first_name,
        last_name: values.last_name,
        address: values.address,
        birthdate: values.birthdate,
      };

      transaction.oncomplete = () => {
        history.push(pathRedirect);
        addedNewUser(payloadUser);
        toast({
          title: "Éxito!",
          description: "Se registró correctamente.",
          position: "top-right",
          isClosable: true,
          status: "success",
        });
      };

      transaction.onerror = () => {
        toast({
          title: "Error!",
          description: "Ocurrió algún error al registrarse",
          position: "top-right",
          isClosable: true,
          status: "error",
        });
      };

      const objectStore = transaction.objectStore("users");

      objectStore.put(payloadUser, payloadUser.id);
    },
    [users]
  );

  return { createUser };
}
