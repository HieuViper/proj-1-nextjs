import DashboardLayout from "@/components/adminLayout";
import { funcLogin } from "@/library/funcLogin";
// import { userRoles } from "@/library/userRoles";
import getConfig from "next/config";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function DashBLayout ({ children, params, searchParams }) {
  async function logout () {
    'use server'
    funcLogin.logout();
  }

  const loginInfo = funcLogin.checkAuthenticationForLayout();

  return <DashboardLayout children={children}
                          user={loginInfo?.user}
                          roles={ getConfig().serverRuntimeConfig.userRoles }
                          {...{logout}}
  />;
}

