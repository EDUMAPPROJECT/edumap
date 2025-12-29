-- Create storage bucket for academy assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('academy-assets', 'academy-assets', true);

-- RLS Policy: Anyone can view (SELECT) files
CREATE POLICY "Public can view academy assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'academy-assets');

-- RLS Policy: Only admin users can upload (INSERT) files
CREATE POLICY "Admins can upload academy assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'academy-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

-- RLS Policy: Only admin users can update files
CREATE POLICY "Admins can update academy assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'academy-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

-- RLS Policy: Only admin users can delete files
CREATE POLICY "Admins can delete academy assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'academy-assets' 
  AND public.has_role(auth.uid(), 'admin')
);