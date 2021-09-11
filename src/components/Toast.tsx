import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Icon } from ".";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import { pipe, not, propEq, filter, append } from "ramda";

const excludeByID = (id: string) => filter(pipe(propEq("id", id), not));

const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const TAG = "toast";

type MessageType = "success" | "warning" | "danger";
interface Message {
  id: string;
  type: MessageType;
  message: string;
  duration?: number;
}
type Emit = (message: Omit<Message, "id">) => void;

const Context = createContext<Emit | undefined>(undefined);

type ToastProps = Omit<Message, "id" | "duration">;
function Toast({ type, message }: ToastProps) {
  return createPortal(
    <div
      className={clsx(
        "flex items-center gap-4 p-2 rounded w-80 border-2 relative",
        type === "success" && "bg-white border-green text-green",
        type === "warning" && "bg-yellow border-yellow text-yellow-darkest",
        type === "danger" && "bg-red border-red text-white"
      )}
    >
      <span className="w-8">
        {type === "success" && <Icon.Success />}
        {type === "warning" && <Icon.Warning />}
        {type === "danger" && <Icon.Ban />}
      </span>

      <div>
        <strong>Toast is ready</strong>
        <p className="opacity-50">{message}</p>
      </div>

      <span className="absolute right-0 top-0 w-4 m-2">
        <Icon.X />
      </span>
    </div>,
    document.getElementById(TAG) as HTMLElement
  );
}

function initial() {
  if (document.getElementById(TAG)) return;

  const wrapper = document.createElement("div");
  wrapper.id = TAG;
  wrapper.classList.add(
    ...clsx(
      "fixed top-0 z-50 pointer-events-none",
      "w-screen h-screen flex flex-col items-end",
      "p-8 gap-2"
    ).split(" ")
  );

  document.body.append(wrapper);
}

type ToastProviderProps = {
  children?: ReactNode;
  defaultDuration?: number;
};
export function ToastProvider({
  children,
  defaultDuration = 10000,
}: ToastProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const emit: Emit = useCallback(
    (message) => {
      const id = uuid();

      setMessages(append({ id, ...message }));

      wait(message.duration || defaultDuration)
        //
        .then(() => setMessages(excludeByID(id)));
    },
    [setMessages]
  );

  useEffect(initial, []);

  return (
    <Context.Provider value={emit}>
      {children}

      {messages.reverse().map(({ id, ...props }) => (
        <Toast {...props} />
      ))}
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}
