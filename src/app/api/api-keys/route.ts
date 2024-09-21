import { NextResponse } from 'next/server';
import { getSessionUser } from '@/app/lib/auth';
import { supabase } from '@/app/lib/supabaseClient';

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, limit } = await request.json();
  const newKeyValue = `dandi-${Date.now()}${Math.random().toString(36).substring(2, 15)}`;

  const { data, error } = await supabase
    .from('api_keys')
    .insert([
      { name, value: newKeyValue, usage: 0, user_id: user.id }
    ])
    .select();

  if (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}