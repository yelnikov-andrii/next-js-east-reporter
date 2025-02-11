'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type SearchInputProps = {
  phrases: string[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ phrases, query, setQuery }: SearchInputProps) {
    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (phrases.length === 0) return;
  
      const currentText = phrases[index];
  
      const handleTyping = () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setPlaceholder((prev) => prev + currentText[charIndex]);
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setPlaceholder((prev) => prev.slice(0, -1));
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      };
  
      const timeout = setTimeout(handleTyping, isDeleting ? 150 : 200);
      return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index, phrases]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    }
  
    return (
      <input
        ref={inputRef}
        className="search-box__input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    );
}
