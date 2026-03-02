import { ForceLightTheme } from "./ForceLightTheme";

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ForceLightTheme />
      {children}
    </>
  );
}
