import { prisma } from "@/db";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { redirect } from "next/navigation";
import { Textarea } from "@mantine/core";

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
      <form action={createPost}>
        <div>
          <input type="text" name="title" />
        </div>
        <div>
          <textarea name="content" />
        </div>
        <div>
          <button type="submit">Create a Post</button>
        </div>
      </form>
      {/* <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Input">
          <Input name="title" />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea name="content" rows={4} />
        </Form.Item>
      </Form> */}
    </>
  );
}
