"use client"

import { useEffect } from "react";

export default function ClientOnlyHtml() {
  useEffect(() => {
    document.documentElement.classList.add("mdl-js");
  }, []);

  return null;
}