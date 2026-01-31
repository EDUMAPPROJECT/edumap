-- class_enrollments의 child_id를 student_profile_id로 변경
-- 기존 child_id는 student_profiles의 id와 동일하므로 외래키만 변경

-- 1. 기존 외래키 제약 조건 삭제
ALTER TABLE public.class_enrollments
DROP CONSTRAINT IF EXISTS class_enrollments_child_id_fkey;

-- 2. 컬럼명 변경 (하위 호환성을 위해 유지하되 설명 추가)
COMMENT ON COLUMN public.class_enrollments.child_id IS 'References student_profiles.id (migrated from children table)';

-- 3. 새 외래키 추가 (student_profiles 참조)
ALTER TABLE public.class_enrollments
ADD CONSTRAINT class_enrollments_child_id_fkey 
FOREIGN KEY (child_id) REFERENCES public.student_profiles(id) ON DELETE SET NULL;

-- 4. manual_schedules의 child_id도 동일하게 처리
ALTER TABLE public.manual_schedules
DROP CONSTRAINT IF EXISTS manual_schedules_child_id_fkey;

ALTER TABLE public.manual_schedules
ADD CONSTRAINT manual_schedules_child_id_fkey 
FOREIGN KEY (child_id) REFERENCES public.student_profiles(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.manual_schedules.child_id IS 'References student_profiles.id (migrated from children table)';