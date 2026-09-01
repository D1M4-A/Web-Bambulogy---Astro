// Supabase Configuration
// Import Supabase client library
import { createClient } from '@supabase/supabase-js';

// Supabase credentials - Replace with your own
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;