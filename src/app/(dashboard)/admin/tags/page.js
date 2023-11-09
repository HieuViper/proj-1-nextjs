

import { funcTags } from "@/library/funcTags";
import TagList from "./_components/TagList";
import { db } from '@/config/db';
import { getLanguages } from "@/library/getLanguages";

async function TagsPage({ searchParams }) {
  if (!db.initialized) {
    await db.initialize();
  }
  const page = searchParams?.page ?? 1;
  const size = searchParams?.size ?? process.env.PAGE_SIZE;
  const search = searchParams?.search ?? "";
  const lang = searchParams?.lang ?? process.env.DEFAULT_LANGUAGE;
  const del = searchParams?.del ?? "";
  const bulkdel = searchParams?.bulkdel ?? "";


  async function getAllTag(page, size, search, lang) {
    'use server'
    const tagData = await funcTags.getAllTags(page, size, search, lang)
    const total = await funcTags.getTotalTags(search, lang)
    return { tagData, total }
  }
  async function getTag(id) {
    'use server'
    const tag = await funcTags.getTags(id)
    return tag
  }
  async function addTag(data, tagLangs, lang) {
    'use server';
    let message = '';
    let id;
    try {
      await funcTags.addTags(data, tagLangs);
      const rs = await funcTags.getAllTags(page, size, search, lang);
      return { message: 1, tagList: rs }

    } catch (error) {
      message = `Fail to add a tags, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editTag(data, tagLangs, id, lang) {
    'use server';
    try {
      await funcTags.updateTags(data, tagLangs, id);
      const rs = await funcTags.getAllTags(page, size, search, lang);
      return { message: 1, tagList: rs }
    } catch (error) {
      return { message: `Fail to update tags, try again or inform your admin: ${error.message}` };
    }
  }
  async function delTag(id) {
    'use server';
    await funcTags.deleteTags(id);
  }
  async function delBulkTag(arrId) {
    'use server';
    await funcTags.deleteBulkTags(arrId);
  }
  async function searchTag(search, lang) {
    'use server'
    const tag = await funcTags.getSearchQuery(search, lang)
    return tag
  }

  if (del != '') {
    await delTag(del);
  }
  if (bulkdel != '') {
    await delBulkTag(bulkdel);
  }
  const langTable = await getLanguages();
  const allTags = await getAllTag(page, size, search, lang)
  const pagination = {
    pageSize: parseInt(size),
    total: allTags.total,
    current: parseInt(page),
  };
  return (
    <>
      <TagList
        dataTable={JSON.stringify(allTags.tagData)}
        langTable={JSON.stringify(langTable)}
        pagination={pagination}
        {...{ getAllTag, getTag, addTag, editTag, delTag, delBulkTag, searchTag }} />
    </>
  );
}

export default TagsPage;
