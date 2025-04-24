"use client";
import React from "react";
import { Loading } from "./Loading";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";

interface TemplateProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({
  children,
  loading = false,
}: TemplateProps) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className={`${
          loading ? "animate-pulse" : ""
        } container mx-auto mt-8 px-4 flex-grow`}
      >
        {children}
      </main>
      <Footer />
      {isClient && (
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          draggable={false}
          closeOnClick={true}
          pauseOnHover={true}
        />
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  function logout() {
    auth.clearUserSession();
    router.push("/login");
  }
  return (
    <header className="bg-indigo-950 text-white py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href={"/galery"}>
          <h1 className="text-3xl font-bold">ImageLite</h1>
        </Link>
        {isClient && auth.isSessionValid() && (
          <div className="flex items-center">
            <div className="relative">
              <span className="w-64 py-3 px-6 text-md">
                Olá {auth.getUserSession()?.name}
              </span>
              <span className="w-64 py-3 px-6 text-sm">
                <a href="#" onClick={logout}>
                  Sair
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        Desenvolvido por Arthur Lancapom.
      </div>
    </footer>
  );
};
