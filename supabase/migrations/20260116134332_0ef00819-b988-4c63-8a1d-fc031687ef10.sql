-- Update generate_random_nickname to have immutable search_path
CREATE OR REPLACE FUNCTION public.generate_random_nickname()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  adjectives text[] := ARRAY['멋진', '훌륭한', '행복한', '즐거운', '열정적인', '친절한', '성실한', '밝은', '용감한', '지혜로운', '부지런한', '따뜻한', '활발한', '창의적인', '당당한', '유쾌한', '사랑스러운', '근면한', '정직한', '겸손한'];
  nouns text[] := ARRAY['선생님', '교육자', '멘토', '코치', '가이드', '리더', '안내자', '조력자', '동반자', '파트너', '지도자', '스승', '강사', '튜터', '마스터', '프로', '전문가', '달인', '명인', '선배'];
  adj text;
  noun text;
  suffix text;
BEGIN
  adj := adjectives[1 + floor(random() * array_length(adjectives, 1))::int];
  noun := nouns[1 + floor(random() * array_length(nouns, 1))::int];
  suffix := LPAD((floor(random() * 10000))::text, 4, '0');
  RETURN adj || noun || suffix;
END;
$$;