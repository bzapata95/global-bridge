import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  useCallback,
} from "react";

interface IIndexedDBContextData {
  DB: MutableRefObject<IDBDatabase>;
  users: IUser[];
  addedNewUser: (user: IUser) => void;
}

const CartContext = createContext<IIndexedDBContextData>(
  {} as IIndexedDBContextData
);

export type IUser = {
  id: string;
  created_at: Date;
  updated_at: Date;
  status: number;
  username: string;
  password: string;
  country_code: string;
  dial_code: string;
  phone: string;
  first_name: string;
  last_name: string;
  address: string;
  birthdate: string;
};

interface IIndexedDBProvider {
  children: ReactNode;
}

function IndexedDBProvider({ children }: IIndexedDBProvider) {
  const DB = useRef<IDBDatabase>({} as IDBDatabase);

  const [users, setUsers] = useState<IUser[]>([]);

  const onLoadUsers = useCallback(() => {
    const arrayUsers: IUser[] = [];
    const transaction = DB.current?.transaction(["users"], "readwrite");

    transaction.oncomplete = () => {
      setUsers(arrayUsers);
    };

    const objectStore = transaction.objectStore("users");

    objectStore.openCursor().onsuccess = (e: any) => {
      const cursor = e.target.result;
      if (cursor) {
        arrayUsers.push(cursor.value);
        cursor.continue();
      }
    };
  }, []);

  useEffect(() => {
    setUsers([]);
    const indexedDB = window.indexedDB.open("globalb@users", 1.1);

    indexedDB.onerror = () => {
      // error
    };

    indexedDB.onsuccess = () => {
      DB.current = indexedDB.result;
      onLoadUsers();
    };

    indexedDB.onupgradeneeded = (ev: any): any => {
      const db = ev.target?.result as IDBDatabase;

      db.createObjectStore("users");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addedNewUser = useCallback((user: IUser) => {
    setUsers((state) => [...state, user]);
  }, []);

  return (
    <CartContext.Provider value={{ DB, users, addedNewUser }}>
      {children}
    </CartContext.Provider>
  );
}

function useIndexedDB(): IIndexedDBContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useIndexedDB must be used within a IndexedDBProvider");
  }

  return context;
}

export { IndexedDBProvider, useIndexedDB };
