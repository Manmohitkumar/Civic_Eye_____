import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

type Complaint = {
  complaint_id?: string;
  title?: string;
  description?: string | null;
  category?: string | null;
  status?: string | null;
  location?: string | null;
  priority?: string | null;
  created_at?: string | null;
  resolved_at?: string | null;
  resolution_time_hours?: number | null;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check auth header
    const authHeader = req.headers.get('Authorization') || '';
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Supabase configuration missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify authenticated user
    const userResult = await supabase.auth.getUser();
    if (userResult.error || !userResult.data?.user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const payload = await req.json().catch(() => ({}));
    const query = typeof payload?.query === 'string' ? payload.query : '';

    // Fetch recent complaints to build context
    const { data: complaintsData, error: dbError } = await supabase
      .from('complaints')
      .select('complaint_id, title, description, category, status, location, priority, created_at, resolved_at, resolution_time_hours')
      .order('created_at', { ascending: false })
      .limit(50);

    if (dbError) {
      return new Response(JSON.stringify({ error: 'Database error', details: dbError.message || dbError }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const complaints = (complaintsData || []) as Complaint[];

    // Compute simple stats
    const totalComplaints = complaints.length;
    const resolvedComplaints = complaints.filter((c) => c.status === 'resolved').length;
    const pendingComplaints = complaints.filter((c) => c.status === 'pending').length;
    const inProgressComplaints = complaints.filter((c) => c.status === 'in_progress').length;

    const resolvedWithTime = complaints.filter((c) => c.resolution_time_hours != null && typeof c.resolution_time_hours === 'number');
    const avgResolutionTime = resolvedWithTime.length > 0
      ? (resolvedWithTime.reduce((sum, c) => sum + (c.resolution_time_hours as number), 0) / resolvedWithTime.length).toFixed(1)
      : 'N/A';

    // Build a concise recent complaints list (truncate descriptions)
    const recentList = complaints.slice(0, 10).map((c) => {
      const id = c.complaint_id ?? 'unknown';
      const title = (c.title || 'No title').replace(/\s+/g, ' ').trim();
      const cat = c.category || 'Other';
      const status = c.status || 'unknown';
      return `- ${id}: ${title} (${cat}, ${status})`;
    }).join('\n');

    const context = `You are an AI assistant for CivicEye. Use the data below to answer user queries concisely.\n\nTotal Complaints: ${totalComplaints}\nResolved: ${resolvedComplaints}\nPending: ${pendingComplaints}\nIn Progress: ${inProgressComplaints}\nAverage Resolution Time: ${avgResolutionTime} hours\n\nRecent complaints:\n${recentList}\n`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI key not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: context }, { role: 'user', content: query }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!aiResp.ok) {
      const text = await aiResp.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'AI gateway error', status: aiResp.status, details: text }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const aiData = await aiResp.json().catch(() => ({}));
    const aiResponse = aiData?.choices?.[0]?.message?.content || aiData?.result?.[0]?.content || aiData?.content || 'I could not process your query.';

    return new Response(JSON.stringify({ response: aiResponse }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: 'Internal server error', message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
