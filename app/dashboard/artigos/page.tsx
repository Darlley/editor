'use client';

import React from 'react'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {
  CheckCircle,
  ChevronLeft,
  Cog,
  Eye,
  File,
  Link2,
  Pen,
  Plus,
  Trash,
} from 'lucide-react';
import 'moment/locale/pt-br';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@heroui/button';
import { Image } from '@heroui/image';
import {Tooltip} from "@heroui/tooltip";
import { Chip } from '@heroui/chip';
import {Spinner} from "@heroui/spinner";

import { PostType } from '@/types/PostType';

const columns = [
  {
    key: 'thumbnail',
    label: 'Capa',
  },
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'audience',
    label: 'Publico',
  },
  {
    key: 'created-at',
    label: 'Criado em',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
];

export default function Page() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(false)


  async function createArticle() {
    
  }

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 p-4 lg:p-6">
      <div className="flex flex-col md:flex-row w-full justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            as={Link}
            href={`/dashboard/sites`}
          >
            <ChevronLeft className="stroke-1 size-4" />
          </Button>
          <h1 className="text-xl">Suas Publicações</h1>
        </div>

        <div className="gap-2 flex items-center">
          <Button
            endContent={<Cog className="stroke-[1.5] size-5" />}
          >
            <span>Configurar</span>
          </Button>
          <Button
            endContent={<Plus />}
            color="primary"
            as={Link}
            href='dashboard/editor'
          >
            <span>Criar artigo</span>
          </Button>
        </div>
      </div>

      <Table
        aria-label="Tabela de artigos"
        fullWidth
        disableAnimation
        classNames={{
          base: 'flex-grow h-full text-default-600 overflow-hidden ',
        }}
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="pl-4">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={posts}
          isLoading={isLoading}
          loadingContent={<Spinner label="Buscando suas publicações..." />}
          emptyContent={
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed dark:border-gray-900 p-8 text-center animate-in fade-in-50">
              <div className="p-2 flex items-center justify-center rounded-full size-20 bg-primary-100 dark:bg-none">
                <File className="size-10 stroke-primary-500" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-primary-900">
                Você não criou nenhuma postagem para o seu site
              </h2>
              <p className="mt-2 mb-8 text-center text-sm leading-tight text-default-400 max-w-sm">
                Você ainda não tem nenhuma publicação. Crie uma agora para
                vê-la aqui!
              </p>

              <Button
                endContent={<Plus />}
                color="primary"
                as={Link}
                href="dashboard/editor"
              >
                Criar post
              </Button>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="w-max">
                  <Image
                    width={60}
                    height={60}
                    alt="Thumbnail"
                    src={item?.thumbnail}
                    fallbackSrc={'/default.png'}
                    radius="sm"
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <h4>{item?.title}</h4>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  {item?.status == 'PUBLISHED' ? (
                    <Chip
                      startContent={
                        <CheckCircle className="size-4 stroke-[1.5]" />
                      }
                      variant="faded"
                      color="success"
                      className="dark:bg-green-950 bg-success text-green-100 border-green-500"
                    >
                      Publicado
                    </Chip>
                  ) : (
                    <Chip variant="dot">Rascunho</Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  {item?.audience == 'CLIENTS' ? (
                    <Chip variant="dot" color="primary">
                      Clientes
                    </Chip>
                  ) : (
                    <Chip variant="dot">Colaborador</Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  {new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'medium',
                  }).format(new Date(item.createdAt))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-full justify-start">
                  <ButtonGroup fullWidth>
                    <Tooltip content={`Ver artigo`} color="primary">
                      <Button
                        size="sm"
                        isIconOnly
                        target="_blank"
                      >
                        <Link2 className="size-4 stroke-1" />
                      </Button>
                    </Tooltip>

                    <Tooltip content={`Editar artigo`} color="warning">
                      <Button
                        size="sm"
                        isIconOnly
                        as={Link}
                        href={`/dashboard/editor?articleId=${item.id}`}
                      >
                        <Pen className="size-4 stroke-1" />
                      </Button>
                    </Tooltip>

                    <Button
                      size="sm"
                      isIconOnly
                    >
                      <Trash className="size-4 stroke-1" />
                    </Button>
                  </ButtonGroup>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}