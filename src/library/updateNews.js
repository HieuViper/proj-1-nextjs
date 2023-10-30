'use server';
import { db } from '@/config/db';
import { redirect } from 'next/dist/server/api-utils';


export async function editNews(data, id) {
  try {
    //const sqlquery = 'UPDATE news SET ? WHERE id = ?';
    console.log("data from client:", data)
  } catch (error) {
    throw new Error('Fail to edit news');
  }
}

export async function addNews(formData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("data from client:", formData);
    throw new Error("database is broken");

    return { message: 'sucessful '};
  } catch (error) {
    return { message: `fail to add news, check your network: ${error}` };
  }
}