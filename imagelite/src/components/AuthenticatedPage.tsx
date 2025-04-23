"use client";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";

interface AuthenticatedPageProps {
  children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({
  children,
}) => {
  const auth = useAuth();
  const isAuthenticated = auth.isSessionValid();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
