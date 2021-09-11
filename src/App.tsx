import React from "react";
import { Background, Icon, ToastProvider, useToast } from "./components";

function Main() {
  const setMessage = useToast();

  return (
    <main
      className="relative z-10 w-screen h-screen container mx-auto"
      onClick={() => setMessage({ type: "success", message: "hello" })}
    >
      <header className="absolute bottom-0 m-[4rem] flex flex-col gap-2">
        <div className="relative w-24 text-yellow -mx-4">
          <span>
            <Icon.Toast />
          </span>

          <span className="absolute top-0 w-full transform -translate-y-1 translate-x-[54%] rotate-[30deg]">
            <Icon.Toast />
          </span>
        </div>

        <h1 className="font-black text-5xl text-yellow">TOAST</h1>

        <p className="text-white text-lg">A delicious addition to your UI.</p>
      </header>
    </main>
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
