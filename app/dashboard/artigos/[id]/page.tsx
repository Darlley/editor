"use client";

import { PostType } from "@/types/PostType";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import clsx from "clsx";
import {
  ChevronDownIcon,
  ChevronRight,
  Dot,
  Eye,
  EyeOff,
  House,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { JSONContent } from "novel";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import { Switch } from "@heroui/switch";
import { User } from "@heroui/user";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { RadioGroup, Radio } from "@heroui/radio";
import { Tooltip } from "@heroui/tooltip";
import { Input, Textarea } from "@heroui/input";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

const EDITOR_INITIAL_VALUE: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Comece a escrever aqui o seu artigo 🥳",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Para mais comandos digite /",
        },
      ],
    },
  ],
};

export default function editor({ id }: { id: string }) {
  const [article, setArticle] = useState<PostType>({
    id: "",
    title: "",
    content: "",
    description: "",
    slug: "",
    thumbnail: "",
    status: "ARCHIVED",
    audience: "CLIENTS",
    createdAt: "",
    updatedAt: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isRequestAction, setIsRequestAction] = useState(false);
  const [isRequestArticleAction, setIsRequestArticleAction] = useState(true);

  useEffect(() => {
    const articleId = window.location.pathname.split("/").pop();
    const existingArticles = JSON.parse(
      localStorage.getItem("articles") || "[]"
    );
    const foundArticle = existingArticles.find(
      (art: PostType) => art.id === articleId
    );

    if (foundArticle) {
      setArticle(foundArticle);
    }
    setIsRequestArticleAction(false);
  }, []);

  return isRequestArticleAction ? (
    <div className="overflow-hidden flex w-full h-full flex-grow flex-col justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="overflow-hidden flex w-full h-full flex-grow flex-col md:flex-row md:justify-between">
      <form className="flex h-full w-full">
        <div className="relative flex-1 flex flex-col h-full max-h-full overflow-y-auto ">
          <nav aria-label="Breadcrumb" className="p-4">
            <ol className="flex items-center gap-1 text-sm text-default-400">
              <li>
                <Link
                  href="/dashboard"
                  className="block transition hover:text-default-300"
                >
                  <span className="sr-only"> Home </span>
                  <House className="size-4 stroke-1" />
                </Link>
              </li>
              <li className="rtl:rotate-180">
                <ChevronRight className="size-3 stroke-1" />
              </li>
              <li>
                <Link
                  href="/dashboard/sites"
                  className="block transition hover:text-default-300"
                >
                  Sites
                </Link>
              </li>
              <li className="rtl:rotate-180">
                <ChevronRight className="size-3 stroke-1" />
              </li>
              <li>
                <Link
                  href="#"
                  className="block transition hover:text-default-300"
                >
                  LeadsZapp
                </Link>
              </li>
              <li className="rtl:rotate-180">
                <ChevronRight className="size-3 stroke-1" />
              </li>
              <li>
                <span className="block transition text-default-500">
                  Criando artigo
                </span>
              </li>
            </ol>
          </nav>
          <div className="w-full flex flex-col gap-1 border-b dark:border-gray-900 p-4">
            <Input
              type="text"
              variant="bordered"
              label="Titulo do artigo"
              labelPlacement="outside"
              isRequired={true}
              placeholder="Escreva um titulo"
            />
            <div className="flex items-center text-sm text-default-400">
              <span>Última atualização 30 Ago, 2024</span>
              <Dot className="fill-primary stroke-primary" />
              <span>Por Darlley Brito</span>
            </div>
          </div>
          <div className="flex-grow p-6 max-h-full overflow-y-auto text-sm">
            {/* <NovelEditor initialValue={EDITOR_INITIAL_VALUE} onChange={console.log} /> */}
            NovelEditor
          </div>
        </div>
        <div className="w-[380px] flex flex-col gap-4 lg:gap-6 p-4 border-l dark:border-gray-900 h-full max-h-full overflow-y-auto">
          <div className="flex justify-between items-center w-full gap-2">
            <div className="flex gap-2">
              <ButtonGroup variant="flat">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isRequestAction}
                  isDisabled={isRequestAction}
                >
                  Salvar
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly color="primary">
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Merge options"
                    selectionMode="single"
                    className="max-w-[300px]"
                  >
                    <DropdownItem key="merge">Ver preview</DropdownItem>
                    <DropdownItem key="squash">Ver no site</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3>Responsáveis</h3>
              <div className="flex justify-between gap-2">
                <User
                  name="Darlley Brito"
                  description="darlleybrito@gmail.com"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
                <AvatarGroup isBordered max={2}>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                </AvatarGroup>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t dark:border-gray-900">
            <div className="pt-4">
              <h1>Configurações do artigo</h1>
            </div>

            <div className="flex gap-2">
              <RadioGroup
                label="Público alvo"
                description="Selecione para quem o artigo ficará visivel."
                orientation="horizontal"
                classNames={{
                  base: "w-full",
                  wrapper: "flex w-full flex-wrap gap-2",
                }}
                defaultValue="CLIENTS"
              >
                <Radio
                  value="CLIENTS"
                  classNames={{
                    base: clsx(
                      "flex m-0 dark:bg-gray-900 dark:hover:border-primary-300 items-center justify-between",
                      "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary col-span-1 !max-w-full"
                    ),
                  }}
                >
                  Clientes
                </Radio>
                <Radio
                  value="EMPLOYEES"
                  classNames={{
                    base: clsx(
                      "flex m-0 dark:bg-gray-900 dark:hover:border-primary-300 items-center justify-between",
                      "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary col-span-1 !max-w-full"
                    ),
                  }}
                >
                  Interno
                </Radio>
              </RadioGroup>
            </div>

            <div>
              <Input
                type="text"
                variant="bordered"
                label="Slug"
                isRequired={true}
                labelPlacement="outside"
                placeholder="Slug do artigo"
                description="exemplo: 'artigo-sobre-financas'"
                endContent={
                  <Tooltip
                    content="Gerar slug automaticamente"
                    placement="left"
                    color="primary"
                  >
                    <Button
                      size="sm"
                      isIconOnly
                      color="primary"
                      radius="full"
                    >
                      <Sparkles className="size-4 stroke-[1.5]" />
                    </Button>
                  </Tooltip>
                }
              />
            </div>

            <div>
              <Textarea
                label="Resumo"
                labelPlacement="outside"
                classNames={{
                  inputWrapper: "dark:bg-gray-900",
                }}
                rows={5}
                description="Escreve um pequeno resumo do seu artigo."
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3>Escolha imagem de capa</h3>
              {false ? (
                <div className="w-full max-h-[400px] relative">
                  <Image
                    isBlurred
                    className=" object-cover "
                    alt="Preview da Thumbnail"
                  />
                  <div className="absolute right-2 top-2 z-10">
                    <Button isIconOnly size="sm" color="danger" radius="full">
                      <X className="size-4 stroke-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Input label="Image" type="file" accept="image/*" />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
