import { prisma } from "@/db";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map(({ id }) => ({ id }));
}

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function page({ params }: any) {
  const post = await getPost(params.id);

  return (
    <>
      <h2>{post?.title}</h2>
      <article>{post?.content}</article>
    </>
  );
}
