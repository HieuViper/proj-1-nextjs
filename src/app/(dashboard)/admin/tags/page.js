import { callNon } from "@/library/api";
import { funcTags } from "@/library/funcTags";
import TagList from "./_components/TagList";
const myConstant = require('@/store/constant')

async function TagsPage({ searchParams }) {
  const page = searchParams?.page ?? 1;
  const size = searchParams?.size ?? myConstant.post.PAGE_SIZE;
  const search = searchParams?.search ?? "";
  const lang = searchParams?.lang ?? myConstant.DEFAULT_LANGUAGE;
  const del = searchParams?.del ?? "";
  const bulkdel = searchParams?.bulkdel ?? "";

  async function getAllTag(page, size, search, lang) {
    "use server";
    const rs = await callNon(
      `/api/tags?page=${page}&size=${size}&search=${search}&lang=${lang}`,
      "GET"
    );
    console.log('rs at getAllTag: ', rs);
    return { tagData: rs.data, total: rs.total };
  }
  async function getTag(id) {
    "use server";
    const tag = await funcTags.getTags(id);
    return tag;
  }
  async function addTag(data, tagLangs, lang) {
    "use server";
    try {
      // await funcTags.addTags(data, tagLangs);
      await callNon("/api/tags", "POST", {
        data: data,
        tagLangs: tagLangs,
      });
      const rs = await callNon(
        `/api/tags?page=${page}&size=${size}&search=${search}&lang=${lang}`,
        "GET"
      );
      return { message: 1, tagList: rs };
    } catch (error) {
      message = `Fail to add a tags, try again or inform your admin: ${error.message}`;
    }
  }

  async function editTag(data, tagLangs, id, lang) {
    "use server";
    try {
      await callNon(`/api/tags/${id}`, "PUT", {
        data: data,
        tagLangs: tagLangs,
      });
      const rs = await callNon(
        `/api/tags?page=${page}&size=${size}&search=${search}&lang=${lang}`,
        "GET"
      );
      // await funcTags.updateTags(data, tagLangs, id);
      // const rs = await funcTags.getAllTags(page, size, search, lang);
      return { message: 1, tagList: rs };
    } catch (error) {
      return {
        message: `Fail to update tags, try again or inform your admin: ${error.message}`,
      };
    }
  }
  async function delTag(id) {
    "use server";
    try {
      const rs = await callNon(`/api/tags/${id}`, "DELETE");
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function delBulkTag(arrId) {
    "use server";
    try {
      const rs = await callNon(`/api/tags`, "DELETE", { arrDell: arrId });
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }

  if (del != "") {
    await delTag(del);
  }
  if (bulkdel != "") {
    await delBulkTag(bulkdel);
  }
  const langTable = await callNon("/api/languages", "GET");
  const allTags = await getAllTag(page, size, search, lang);
  const pagination = {
    pageSize: parseInt(size),
    total: allTags.total,
    current: parseInt(page),
  };
  console.log('allTags:', allTags);
  return (
    <>
      <TagList
        dataTable={JSON.stringify(allTags.tagData)}
        langTable={JSON.stringify(langTable.data)}
        pagination={pagination}
        {...{
          getAllTag,
          getTag,
          addTag,
          editTag,
          delTag,
          delBulkTag,
        }}
      />
    </>
  );
}

export default TagsPage;
