import { callNon } from "@/library/api";
import LanguageList from "./_components/LanguageList";

const LanguagePage = async () => {
  async function getLanguage(id) {
    "use server";
    const language = await callNon(`/api/languages/${id}`);
    return language;
  }
  async function addLanguage(data) {
    "use server";
    try {
      const rs = await callNon("/api/languages", "POST", { data: data });
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to add Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function editLanguage(data, id) {
    "use server";
    try {
      const rs = await callNon(`/api/languages/${id}`, "PUT", { data: data });
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function delLanguage(id) {
    "use server";
    try {
      const rs = await callNon(`/api/languages/${id}`, "DELETE");
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function delBulkLanguage(arrId) {
    "use server";
    try {
      const rs = await callNon(`/api/languages`, "DELETE", { arrDell: arrId });
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function searchLanguage(search) {
    "use server";
    try {
      const rs = await callNon(`/api/languages/search`, "POST", {
        search: search,
      });
      return { message: 1, result: rs.data };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }

  const langTable = await callNon("/api/languages", "GET");

  return (
    <div>
      <LanguageList
        langTable={JSON.stringify(langTable)}
        {...{
          getLanguage,
          addLanguage,
          editLanguage,
          delLanguage,
          delBulkLanguage,
          searchLanguage,
        }}
      />
    </div>
  );
};

export default LanguagePage;
