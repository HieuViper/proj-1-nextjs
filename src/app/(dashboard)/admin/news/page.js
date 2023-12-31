/* eslint-disable @next/next/no-async-client-component */

import { useRouter } from 'next/navigation';
import { news } from '@/library/news';
import NewsList from './_components/NewsList';
import { funcLogin } from '@/library/funcLogin';
import getConfig from 'next/config';

// This part is important!
export const dynamic = "force-dynamic";

async function NewsPage({ searchParams }) {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'news');

  const result = await news.newsList(loginInfo);
  if ( result.error )
    throw new Error( 'Error: ' + result.msg );

  return (
    <>
      <NewsList
        dataTable={JSON.stringify(result.news)}
        pagination={result.pagination}
        totals={result.totals}
        langTable={JSON.stringify(result.languages)}
        user={ loginInfo.user }
        roles={ getConfig().serverRuntimeConfig.userRoles }
        isAuthorize={ isAuthorize }
      />
      ;
    </>
  );
}

export default NewsPage;
