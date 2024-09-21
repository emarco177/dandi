import { getServerSession } from "next-auth/next";
import {  } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from './supabaseClient';

export async function getSessionUser() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single();

  if (error || !user) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user;
}