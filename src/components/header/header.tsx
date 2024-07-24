"use client";

interface HeaderProps {
  text: string;
}

export const Header = (props: HeaderProps) => {
  return <h1 className="text-3xl font-bold flex justify-center text-center">{props.text}</h1>;
}