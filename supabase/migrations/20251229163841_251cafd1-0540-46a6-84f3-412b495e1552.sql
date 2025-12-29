-- Create posts table for academy news
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  academy_id UUID NOT NULL REFERENCES public.academies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'news' CHECK (category IN ('notice', 'news', 'event')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view posts
CREATE POLICY "Anyone can view posts"
ON public.posts FOR SELECT
USING (true);

-- Academy owners can insert posts
CREATE POLICY "Academy owners can insert posts"
ON public.posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM academies
    WHERE academies.id = posts.academy_id
    AND academies.owner_id = auth.uid()
  )
);

-- Academy owners can update their posts
CREATE POLICY "Academy owners can update their posts"
ON public.posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM academies
    WHERE academies.id = posts.academy_id
    AND academies.owner_id = auth.uid()
  )
);

-- Academy owners can delete their posts
CREATE POLICY "Academy owners can delete their posts"
ON public.posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM academies
    WHERE academies.id = posts.academy_id
    AND academies.owner_id = auth.uid()
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();