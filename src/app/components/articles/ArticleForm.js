"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ArticleForm() {
  const [articles, setArticles] = useState({
    title: "",
    category_id: 0,
    short: "",
    content: "",
    author: "",
    code: "",
    active: false,
  });
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetcharticles = async (id) => {
      try {
        const { data } = await axios.get("/api/articles/" + id);
        console.log(
          "🚀 ~ file: articlesForm.js:20 ~ fetcharticles ~ data:",
          data
        );
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetcharticles(params.id);
    }
  }, [params.id]);

  const handleChange = ({ target: { name, value } }) =>
    setArticles({ ...articles, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params?.id) {
        await axios.put("/api/articles/" + params.id, {
          name: articles.name,
          description: articles.description,
          price: articles.price,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/articles", articles);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="Title Article"
            id="title"
            name="title"
            onChange={handleChange}
            value={articles.title}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            articles Price:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            name="price"
            placeholder="10.00"
            onChange={handleChange}
            value={articles.price}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Write a Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            placeholder="articles description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            onChange={handleChange}
            value={articles.description}
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {params?.id ? "Update articles" : "Save articles"}
        </button>
      </form>
    </div>
  );
}
