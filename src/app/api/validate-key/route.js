import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req) {
  const { apiKey } = await req.json();

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('value', apiKey)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (data) {
      return NextResponse.json({ message: 'Valid API key' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid API key' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ message: 'Error validating API key' }, { status: 500 });
  }
}