import React from "react";
import { Icon } from ".";
import { range } from "ramda";

interface Vector {
  x: number;
  y: number;
}
type ToastProps = {
  position: Vector;
};
function Toast({ position }: ToastProps) {
  return (
    <div
      className="w-24 absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Icon.Toast />
    </div>
  );
}

const counts = getRandomInt(10, 20);
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function Background() {
  return (
    <div className="fixed top-0 left-0">
      <div className="relative text-yellow opacity-20">
        {range(0, counts).map((index) => (
          <Toast
            key={index}
            position={{
              x: getRandomInt(0, window.innerWidth),
              y: getRandomInt(0, window.innerHeight),
            }}
          />
        ))}
      </div>
    </div>
  );
}
