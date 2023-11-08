

import { tagsModel } from "@/library/Tags";
import TagList from "./_components/TagList";
import { db } from '@/config/db';
import { getLanguages } from "@/library/getLanguages";

async function TagsPage() {
  if (!db.initialized) {
    await db.initialize();
  }

  async function getAllTag(lang) {
    'use server'
    const tag = await tagsModel.getAllTags(lang)
    return tag
  }
  async function getTag(id) {
    'use server'
    const tag = await tagsModel.getTags(id)
    return tag
  }
  async function addTag(data, tagLangs, lang) {
    'use server';
    let message = '';
    let id;
    try {
      await tagsModel.addTags(data, tagLangs);
      const rs = await tagsModel.getAllTags(lang);
      return { message: 1, tagList: rs }

    } catch (error) {
      message = `Fail to add a tags, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editTag(data, tagLangs, id, lang) {
    'use server';
    try {
      await tagsModel.updateTags(data, tagLangs, id);
      const rs = await tagsModel.getAllTags(lang);
      return { message: 1, tagList: rs }
    } catch (error) {
      return { message: `Fail to update tags, try again or inform your admin: ${error.message}` };
    }
  }
  async function delTag(id) {
    'use server';
    await tagsModel.deleteTags(id);
  }
  async function delBulkTag(arrId) {
    'use server';
    await tagsModel.deleteBulkTags(arrId);
  }
  async function searchTag(search, lang) {
    'use server'
    const tag = await tagsModel.getSearchQuery(search, lang)
    return tag
  }
  const allTags = await tagsModel.getAllTags(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE)
  const langTable = await getLanguages();

  return (
    <>
      <TagList
        dataTable={JSON.stringify(allTags)}
        langTable={JSON.stringify(langTable)}
        {...{ getAllTag, getTag, addTag, editTag, delTag, delBulkTag, searchTag }} />
    </>
  );
}

export default TagsPage;
