import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://yhlbgdgdgclkkaxkssal.supabase.co';
const supabaseKey = import.meta.env.VITE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);