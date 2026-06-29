import Link from 'next/link';
import { Calendar, User, Clock } from 'lucide-react';
import { Blog } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '../ui/Badge';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-border/80 transition-all duration-300 flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="info" className="bg-bg-card/90 backdrop-blur-sm uppercase tracking-wide text-[10px]">
            {blog.category}
          </Badge>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex flex-col justify-between flex-grow gap-4 font-body">
        <div className="space-y-2">
          {/* Metadata info */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-muted">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-accent" /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" /> {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" /> {blog.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent line-clamp-2 transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
            {blog.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-2 border-t border-border/40">
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-accent hover:text-accent-hover text-xs font-semibold tracking-wide inline-flex items-center gap-1 group/link"
          >
            Read More
            <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
