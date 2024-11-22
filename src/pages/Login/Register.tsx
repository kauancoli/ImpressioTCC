import { RegisterForm } from "./Components/RegisterForm";

export const Register = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
      <aside className="justify-center items-center h-full hidden lg:flex select-none">
        <img
          src="/logo.svg"
          width={500}
          height={500}
          alt="Logo Impressio"
          className="w-3/4 lg:w-2/3"
        />
      </aside>

      <main className="flex justify-center items-center h-full">
        <div className="w-3/4 lg:w-1/2">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};
