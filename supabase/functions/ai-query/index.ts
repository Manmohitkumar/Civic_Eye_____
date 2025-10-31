import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    console.log('AI Query received:', query);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch complaints data for context
    const { data: complaints, error: dbError } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Fetched complaints:', complaints?.length);

    // Calculate statistics
    const totalComplaints = complaints?.length || 0;
    const resolvedComplaints = complaints?.filter(c => c.status === 'resolved').length || 0;
    const pendingComplaints = complaints?.filter(c => c.status === 'pending').length || 0;
    const inProgressComplaints = complaints?.filter(c => c.status === 'in_progress').length || 0;

    const resolvedWithTime = complaints?.filter(c => c.resolution_time_hours != null) || [];
    const avgResolutionTime = resolvedWithTime.length > 0
      ? (resolvedWithTime.reduce((sum, c) => sum + (c.resolution_time_hours || 0), 0) / resolvedWithTime.length).toFixed(1)
      : 'N/A';

    // Prepare context for AI
    const context = `
You are an AI assistant for the Smart Complaint Portal. Here's the current data:

Total Complaints: ${totalComplaints}
Resolved: ${resolvedComplaints}
Pending: ${pendingComplaints}
In Progress: ${inProgressComplaints}
Average Resolution Time: ${avgResolutionTime} hours

Recent complaints:
${complaints?.slice(0, 10).map(c => 
  `- ${c.complaint_id}: ${c.title} (${c.category}, ${c.status})`
).join('\n')}

Please answer the following user query based on this data. Be concise and helpful.
`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Calling Lovable AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    console.log('AI response received');

    const aiResponse = aiData.choices?.[0]?.message?.content || 'I could not process your query.';

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in ai-query function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
