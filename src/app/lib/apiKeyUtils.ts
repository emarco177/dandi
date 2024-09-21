import { supabase } from './supabaseClient';

interface ApiKeyData {
  id: string;
  usage: number;
  limit: number;
}

export async function validateApiKey(apiKey: string): Promise<ApiKeyData | null> {
  try {
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('api_keys')
      .select('id, usage, limit')
      .eq('value', apiKey)
      .maybeSingle();

    if (apiKeyError) {
      throw apiKeyError;
    }

    return apiKeyData;
  } catch (error) {
    console.error('Error validating API key:', error);
    throw error;
  }
}

export async function incrementApiKeyUsage(apiKeyData: ApiKeyData): Promise<{ success: boolean; message: string }> {
  try {
    if (apiKeyData.usage >= apiKeyData.limit) {
      return { success: false, message: 'Rate limit exceeded' };
    }

    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: apiKeyData.usage + 1 })
      .eq('id', apiKeyData.id);

    if (updateError) {
      throw updateError;
    }

    return { success: true, message: 'Usage incremented successfully' };
  } catch (error) {
    console.error('Error incrementing API key usage:', error);
    throw error;
  }
}