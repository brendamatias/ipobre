import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen px-4 sm:py-10 py-6 flex items-center justify-center">
      <Outlet />
    </main>
  );
};

export { DefaultLayout };
