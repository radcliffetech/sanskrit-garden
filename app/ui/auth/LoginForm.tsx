import React from "react";

type LoginFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  error?: string;
};

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  return (
    <>
      {error && (
        <div style={{ color: "red", marginBottom: "1em" }}>{error}</div>
      )}
      <div className="space-y-4 max-w-sm mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
