import * as React from "react";
import { prisma } from "@/db";
import { Card, Space, Typography } from "antd";
import Link from "next/link";

const getPosts = async () => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const PostList: React.FC = async () => {
  const posts = await getPosts();

  return (
    <Space direction="vertical" size={16}>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <Card
            className="mb-3"
            key={post.id}
            title={post.title}
            bordered={false}
            style={{ width: 400 }}
          >
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.content}
            </p>
          </Card>
        </Link>
      ))}
    </Space>
  );
};

export default PostList;
