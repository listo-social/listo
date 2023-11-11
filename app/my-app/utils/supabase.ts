import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aersbdsjumplvdjmfctv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcnNiZHNqdW1wbHZkam1mY3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2ODgxNjIsImV4cCI6MjAxNTI2NDE2Mn0._7z5Ta-i0N7CBsTLZU9OAKtFPIuJuWwTMHX0PZiuHIQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
