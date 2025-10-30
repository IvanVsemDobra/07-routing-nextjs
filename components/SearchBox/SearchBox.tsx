"use client";

import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  onChange: (query: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      className={css.input}
      onChange={handleInput}
    />
  );
};

export default SearchBox;
