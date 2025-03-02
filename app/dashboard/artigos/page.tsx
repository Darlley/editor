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
import { v4 as uuidv4 } from 'uuid';

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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({ published: true });
  const [mdContent, setMdContent] = useState({});
  const [htmlContent, setHtmlContent] = useState("");
  const [currentArticle, setCurrentArticle] = useState<PostType | null>(null);
  const [title, setTitle] = useState("");
  const [isSavedNotificationShow, setIsSavedNotificationShow] = useState(false);

  // Fetch all articles from localStorage
  const fetchArticles = () => {
    setIsLoading(true);
    try {
      const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
      setPosts(storedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchArticles();
  }, []);

  // Create a new article
  async function createArticle() {
    const newArticle: PostType = {
      id: uuidv4(),
      title: "Novo Artigo",
      content: "",
      description: "Descrição do artigo",
      slug: `artigo-${Date.now()}`,
      thumbnail: "/default.png",
      status: "ARCHIVED", // Draft by default
      audience: "CLIENTS",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user-1", // Replace with actual user ID
      siteId: "site-1", // Replace with actual site ID
    };
    
    const existingArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const updatedArticles = [...existingArticles, newArticle];
    
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    fetchArticles();
    
    return newArticle.id;
  }

  // Get a single article by ID
  const getArticleById = (id: string) => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    return articles.find((article: PostType) => article.id === id) || null;
  };

  // Update an existing article
  const updateArticle = (updatedArticle: PostType) => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const updatedArticles = articles.map((article: PostType) => 
      article.id === updatedArticle.id ? updatedArticle : article
    );
    
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    fetchArticles();
    setIsSavedNotificationShow(true);
    setTimeout(() => {
      setIsSavedNotificationShow(false);
    }, 3000);
  };

  // Delete an article
  const deleteArticle = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este artigo?")) {
      const articles = JSON.parse(localStorage.getItem("articles") || "[]");
      const filteredArticles = articles.filter((article: PostType) => article.id !== id);
      
      localStorage.setItem("articles", JSON.stringify(filteredArticles));
      fetchArticles();
    }
  };

  // Toggle article status (Published/Draft)
  const toggleArticleStatus = (id: string) => {
    const article = getArticleById(id);
    if (article) {
      const updatedArticle = {
        ...article,
        status: article.status === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED",
        updatedAt: new Date().toISOString()
      };
      updateArticle(updatedArticle);
    }
  };

  // Toggle audience (Clients/Employees)
  const toggleArticleAudience = (id: string) => {
    const article = getArticleById(id);
    if (article) {
      const updatedArticle = {
        ...article,
        audience: article.audience === "CLIENTS" ? "EMPLOYEES" : "CLIENTS",
        updatedAt: new Date().toISOString()
      };
      updateArticle(updatedArticle);
    }
  };

  // Handle navigation to editor with article ID
  const handleCreateAndRedirect = async () => {
    const newId = await createArticle();
    window.location.href = `/dashboard/editor?articleId=${newId}`;
  };

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
            onPress={handleCreateAndRedirect}
          >
            <span>Criar artigo</span>
          </Button>
        </div>
      </div>

      {isSavedNotificationShow && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>Artigo salvo com sucesso!</p>
        </div>
      )}

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
                onClick={handleCreateAndRedirect}
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
                  {item?.status === 'PUBLISHED' ? (
                    <Chip
                      startContent={
                        <CheckCircle className="size-4 stroke-[1.5]" />
                      }
                      variant="faded"
                      color="success"
                      className="dark:bg-green-950 bg-success text-green-100 border-green-500"
                      onClick={() => toggleArticleStatus(item.id)}
                    >
                      Publicado
                    </Chip>
                  ) : (
                    <Chip 
                      variant="dot"
                      onClick={() => toggleArticleStatus(item.id)}
                    >
                      Rascunho
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  {item?.audience === 'CLIENTS' ? (
                    <Chip 
                      variant="dot" 
                      color="primary"
                      onClick={() => toggleArticleAudience(item.id)}
                    >
                      Clientes
                    </Chip>
                  ) : (
                    <Chip 
                      variant="dot"
                      onClick={() => toggleArticleAudience(item.id)}
                    >
                      Colaborador
                    </Chip>
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
                        as={Link}
                        href={`/articles/${item.slug}`}
                      >
                        <Eye className="size-4 stroke-1" />
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
                      onClick={() => deleteArticle(item.id)}
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