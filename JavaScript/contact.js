//--DATABASE---------------------------------------------------------------------------------------//
//import supabase library and setup the connection to database
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
let supabaseURL = 'https://bokfydvnukbsveefvbbt.supabase.co';
let supabaseAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJva2Z5ZHZudWtic3ZlZWZ2YmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzMzgsImV4cCI6MjA3NjI5ODMzOH0.QHMHbQbgxU0_9vGEkYp2xeKxk-HImPvtFB_PAsFud4s';
//create a connection to the backend: database
let supabase = createClient(supabaseURL, supabaseAPI);

//-------------------------------------------------------------------------------------------------//

