import { funcLanguage } from "@/library/funcLanguages";
import LanguageList from "./_components/LanguageList";

const LanguagePage = async () => {
  async function getLanguage(id) {
    "use server";
    const language = await funcLanguage.getLanguage(id);
    return language;
  }
  async function addLanguage(data) {
    "use server";
    try {
      const rs = await funcLanguage.addLanguage(data);
      const allRs = await funcLanguage.getLanguages();
      return { message: 1, result: allRs };
    } catch (error) {
      throw new Error(
        `Fail to add Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function editLanguage(data, id) {
    "use server";
    try {
      const rs = await funcLanguage.updateLanguage(data, id);
      const allRs = await funcLanguage.getLanguages();
      return { message: 1, result: allRs };
    } catch (error) {
      throw new Error(
        `Fail to update Languages, try again or inform your admin: ${error.message}`
      );
    }
  }
  async function delLanguage(id) {
    "use server";
    await funcLanguage.deleteLanguage(id);
  }
  async function delBulkLanguage(arrId) {
    "use server";
    await funcLanguage.deleteBulkLanguages(arrId);
  }
  async function searchLanguage(search, lang) {
    "use server";
    const rs = await funcLanguage.getSearchQuery(search);
    return rs;
  }

  const langTable = await funcLanguage.getLanguages();

  return (
    <div>
      <LanguageList
        data={JSON.stringify(langTable)}
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
