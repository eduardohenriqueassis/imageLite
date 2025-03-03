import React from "react";
import { Loading } from "./Loading";
import { ToastContainer } from "react-toastify";

interface TemplateProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({
  children,
  loading = false,
}: TemplateProps) => {
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
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        draggable={false}
        closeOnClick={true}
        pauseOnHover={true}
      />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-950 text-white py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">ImageLite</h1>
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
