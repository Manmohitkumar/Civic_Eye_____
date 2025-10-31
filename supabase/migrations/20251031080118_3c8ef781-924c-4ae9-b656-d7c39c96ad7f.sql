-- Create a secure view for public complaints that excludes user_id and reduces GPS precision
CREATE OR REPLACE VIEW public.complaints_public AS
SELECT
  id,
  complaint_id,
  title,
  description,
  category,
  location,
  status,
  priority,
  -- Round coordinates to 3 decimal places (~100m precision) to reduce tracking risk
  ROUND(CAST(latitude AS numeric), 3) AS latitude,
  ROUND(CAST(longitude AS numeric), 3) AS longitude,
  created_at,
  updated_at,
  resolved_at,
  resolution_time_hours,
  attachments,
  images,
  assigned_to
FROM public.complaints;

-- Enable RLS on the view
ALTER VIEW public.complaints_public SET (security_invoker = true);

-- Grant SELECT access to anonymous users on the view
GRANT SELECT ON public.complaints_public TO anon;
GRANT SELECT ON public.complaints_public TO authenticated;