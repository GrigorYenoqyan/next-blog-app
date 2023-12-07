import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function createPost(data: FormData) {
  "use server";
  console.log(data);

  const title = data.get("title")?.valueOf();
  const content = data.get("content")?.valueOf();

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    title.length === 0 ||
    content.length === 0
  ) {
    return;
  }

  await prisma.post.create({ data: { title, content } });

  redirect("/");
}

export default function Home() {
  return (
    <>
      <form
        action={createPost}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the title"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the content"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 border-none rounded-md focus:outline-none hover:bg-blue-600"
          >
            Create a Post
          </button>
        </div>
      </form>
    </>
  );
}
