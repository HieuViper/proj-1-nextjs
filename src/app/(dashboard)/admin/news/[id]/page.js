/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function loadNews(newsId) {
  const { data } = await axios.get(
    "http://localhost:3000/api/news/" + newsId
  );
  return data;
}

async function NewsPage({ params }) {
  const router = useRouter();
  const news = await loadNews(params.id);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/news/" + id);
      toast.success("Task deleted");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800">
        <p>Name: {news.name}</p>
        <p>Description: {news.description}</p>
        <p>Price: {news.price}</p>
      </div>

      <div className="mt-7 flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
          onClick={() => handleDelete(news.id)}
        >
          delete
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-800 ml-2 py-2 px-5 rounded"
          onClick={() => router.push("/admin/newss/edit/" + news.id)}
        >
          Edit
        </button>
      </div>
    </>
  );
}

export default NewsPage;
