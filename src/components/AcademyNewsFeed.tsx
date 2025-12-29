import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Megaphone, Bell, PartyPopper } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
  image_url: string | null;
  academy: {
    id: string;
    name: string;
    profile_image: string | null;
  };
}

interface AcademyNewsFeedProps {
  posts: Post[];
  loading: boolean;
  onPostClick: (post: Post) => void;
}

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  notice: { label: "공지", icon: Bell, color: "bg-primary text-primary-foreground" },
  news: { label: "소식", icon: Megaphone, color: "bg-secondary text-secondary-foreground" },
  event: { label: "이벤트", icon: PartyPopper, color: "bg-accent text-accent-foreground" },
};

const AcademyNewsFeed = ({ posts, loading, onPostClick }: AcademyNewsFeedProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="mb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">우리 동네 학원 새소식</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="min-w-[200px] p-3 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-12" />
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">우리 동네 학원 새소식</h2>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {posts.map((post) => {
          const config = categoryConfig[post.category] || categoryConfig.news;
          const CategoryIcon = config.icon;
          
          return (
            <Card 
              key={post.id}
              onClick={() => onPostClick(post)}
              className="min-w-[200px] max-w-[200px] p-3 shrink-0 cursor-pointer hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0">
                  {post.academy.profile_image ? (
                    <img 
                      src={post.academy.profile_image} 
                      alt={post.academy.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-xs font-bold">
                      {post.academy.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground truncate">
                  {post.academy.name}
                </span>
              </div>
              
              <div className="flex items-center gap-1 mb-1">
                <Badge className={`text-[10px] px-1.5 py-0 ${config.color}`}>
                  <CategoryIcon className="w-2.5 h-2.5 mr-0.5" />
                  {config.label}
                </Badge>
              </div>
              
              <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2">
                {post.title}
              </h3>
              
              <p className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { 
                  addSuffix: true, 
                  locale: ko 
                })}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default AcademyNewsFeed;
