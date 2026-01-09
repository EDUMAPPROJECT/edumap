-- Allow super admins to insert academies
CREATE POLICY "Super admins can insert academies"
ON public.academies
FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin(auth.uid()));