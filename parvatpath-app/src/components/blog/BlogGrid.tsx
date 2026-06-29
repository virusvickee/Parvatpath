import { Blog } from '@/types';
import BlogCard from './BlogCard';

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 bg-bg-card border border-border rounded-xl">
        <p className="text-text-secondary text-sm">No blogs found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog._id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
}
