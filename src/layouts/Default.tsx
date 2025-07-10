import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen px-4 py-10 flex items-center justify-center">
      <Outlet />
    </main>
  );
};

export { DefaultLayout };
