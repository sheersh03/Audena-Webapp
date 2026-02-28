"use client";

import { useCallback } from "react";
import { StitchPage } from "@/components/StitchPage";

function enhanceLoginPage(container: HTMLElement): void | (() => void) {
  const passwordToggle = container.querySelector("#password-toggle");
  const passwordInput = container.querySelector("#password") as HTMLInputElement | null;
  const form = container.querySelector("#login-form");

  const handlePasswordToggle = () => {
    if (!passwordInput || !passwordToggle) return;
    const icon = passwordToggle.querySelector(".material-icons-round");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      if (icon) icon.textContent = "visibility";
    } else {
      passwordInput.type = "password";
      if (icon) icon.textContent = "visibility_off";
    }
  };

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    // Placeholder: in production, wire to auth API
    const formEl = e.target as HTMLFormElement;
    const email = (formEl.querySelector("#email") as HTMLInputElement)?.value;
    const password = (formEl.querySelector("#password") as HTMLInputElement)?.value;
    if (email && password) {
      // TODO: integrate with auth provider
      console.log("Login attempt:", { email });
    }
  };

  passwordToggle?.addEventListener("click", handlePasswordToggle);
  form?.addEventListener("submit", handleFormSubmit);

  return () => {
    passwordToggle?.removeEventListener("click", handlePasswordToggle);
    form?.removeEventListener("submit", handleFormSubmit);
  };
}

interface LoginPageProps {
  html: string;
}

export function LoginPage({ html }: LoginPageProps) {
  const enhance = useCallback(enhanceLoginPage, []);

  return (
    <StitchPage
      html={html}
      enhance={enhance}
      className="!bg-background-login"
    />
  );
}
