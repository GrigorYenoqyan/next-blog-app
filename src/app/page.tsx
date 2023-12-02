import { redirect } from "next/navigation";
import PostList from "./components/PostList";

export default function Home() {
  redirect('/posts')
}
