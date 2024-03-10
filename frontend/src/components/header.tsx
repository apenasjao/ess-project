import Link from "next/link";
import { AppRoute } from "./app-layout";

export function Header({ routes, name }: { routes: AppRoute[], name?: string }) {
  return (
    <header className="bg-gradient-to-t from-slate-50 to-rose-700 h-64 flex justify-center items-center">
      <nav className="flex px-6 py-4 bg-slate-50 rounded-[20px] gap-4 items-center">

        <h1 className="font-bold text-xl text-rose-700">Aury</h1>

        <div className="flex gap-4">
          {
            routes.map((route) => (
              <Link key={route.path} href={route.path} passHref className="text-xl font-medium text-rose-700 hover:text-rose-950 hover:underline hover:decoration-rose-950 hover:transition hover:ease-in-out hover:duration-300 cursor-pointer">
                {route.name}
              </Link>
            ))
          }
        </div>

        {
          name && (
            <p className="text-lg font-medium bg-aury rounded-xl px-3 py-1 text-white">Olá, {name.split(' ')[0]}!</p>
          )
        }

      </nav>
    </header>
  )
}