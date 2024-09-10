import { supabase } from './supabaseClient';

export const fetchApiKeys = async () => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
  
  if (error) {
    console.error('Error fetching API keys:', error);
    throw error;
  }
  return data;
};

export const createApiKey = async (name, limit) => {
  const newKeyValue = `dandi-${Date.now()}${Math.random().toString(36).substring(2, 15)}`;
  const { data, error } = await supabase
    .from('api_keys')
    .insert([
      { name, value: newKeyValue, usage: 0, limit }
    ])
    .select()

  if (error) {
    console.error('Error creating API key:', error);
    throw error;
  }
  return data[0];
};

export const updateApiKey = async (id, name) => {
  const { data, error } = await supabase
    .from('api_keys')
    .update({ name })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating API key:', error);
    throw error;
  }
  return data[0];
};

export const deleteApiKey = async (id) => {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting API key:', error);
    throw error;
  }
};