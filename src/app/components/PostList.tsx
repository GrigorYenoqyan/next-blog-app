import * as React from "react";
import { prisma } from "@/db";
import { Card, Space, Typography } from "antd";

const getPosts = async () => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};

const PostList: React.FC = async () => {
  const posts = await getPosts();

  console.log({ posts });

  return (
    <Space direction="vertical" size={16}>
      {posts.map((post) => (
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
            {/* {post.content} */}
            <p>{"post.createdAt.toDateString()"}</p>
          </p>
        </Card>
      ))}
    </Space>
  );
};

export default PostList;
