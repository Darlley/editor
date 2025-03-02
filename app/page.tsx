import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import LogotipoIcon from './../icons/LogotipoIcon';

export default function Home() {

  return (
    <main className="w-full h-full dark:bg-gray-950 p-4">
      <section className="relative flex flex-col w-full mx-auto md:flex-row md:items-center md:justify-between">
        <div className="w-full flex flex-row items-center justify-between text-sm">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div>
              <LogotipoIcon width="50" height="39" />
            </div>
            <h3 className="text-2xl">
              Knowledge<span className="text-primary">+</span>
            </h3>
          </Link>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <Button color="primary" as={Link} href="/dashboard"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center mx-auto container">
        <div className="relative items-center w-full py-12 lg:py-20 mx-auto">
          <div className="text-center">
            <Chip color="primary" size="lg" variant="shadow">
              Startup de blogging SaaS definitiva
            </Chip>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Configure seu blog{' '}
              <span className="text-primary block">em minutos!</span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 font-light text-lg text-default-500 tracking-tighter">
              Configurar seu blog é difícil e consome tempo. Nós facilitamos
              para você criar um blog em minutos
            </p>

            <div className="flex gap-2 justify-center mt-4">
              <Button
                color="primary"
                as={Link}
                href="/dashboard"
              >
                Experimente grátis
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center w-full mx-auto mt-12">
            <Image
              src="dark-preview.jpeg"
              alt="Hero image"
              className="relative object-cover w-full border dark:border-gray-800 rounded-2xl shadow-2xl dark:shadow-primary/10 mx-auto"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
