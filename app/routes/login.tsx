import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/auth/login");
};

export default function Login() {
  return null;
}
