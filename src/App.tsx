import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";
import { Background, Toast } from "./components";
import { v4 as uuid } from "uuid";

type Emit = (message: string) => void;
const Context = createContext<Emit | undefined>(undefined);

type ToastProviderProps = {
  children?: ReactNode;
};
function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<{ id: string; message: string }[]>(
    []
  );

  const setMessage = useCallback(
    (message) => {
      if (!message) return;

      const id = uuid();

      setMessages((queue) => [...queue, { id, message }]);

      setTimeout(() => {
        setMessages((queue) => queue.filter((pair) => pair.id !== id));
      }, 3000);
    },
    [setMessages]
  );

  return (
    <Context.Provider value={setMessage}>
      {children}

      {messages.map((message, index) => (
        <Toast type="success" key={index} />
      ))}
    </Context.Provider>
  );
}

function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}

function Main() {
  const setMessage = useToast();

  return (
    <main
      className="relative z-10 w-screen h-screen"
      onClick={() => setMessage("click")}
    ></main>
  );
}

function App() {
  return (
    <>
      <Background />

      <ToastProvider>
        <Main />
      </ToastProvider>
    </>
  );
}

export default App;
