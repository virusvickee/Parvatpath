'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import { Calendar, User, Clock, MessageSquare, Link as LinkIcon, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Blog } from '@/types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }

    async function loadBlogData() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const allBlogs: Blog[] = await res.json();
          const current = allBlogs.find((b) => b.slug === params.slug);
          if (current) {
            setBlog(current);
            setRelatedBlogs(
              allBlogs.filter((b) => b.slug !== current.slug && b.isPublished).slice(0, 3)
            );
          }
        }
      } catch (err) {
        console.error('Failed to load blog detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading blog details...</p>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  // Parse H2 elements for TOC
  const headings: string[] = [];
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  let match;
  while ((match = h2Regex.exec(blog.content)) !== null) {
    headings.push(match[1]);
  }

  // Share handlers
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out this article: "${blog.title}" - `
  )}${encodeURIComponent(currentUrl)}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    blog.title
  )}&url=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20">
      {/* Blog Hero Cover */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end justify-start overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${blog.coverImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-black/30 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pb-8 flex flex-col gap-3">
          <div className="flex gap-2">
            <Badge variant="info" className="uppercase text-[9px] font-bold">
              {blog.category}
            </Badge>
          </div>

          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary mt-2 font-body">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-accent" /> {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent" /> {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> {blog.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main content body (col-span-3) */}
          <div className="lg:col-span-3 bg-bg-card/30 border border-border/40 p-6 md:p-10 rounded-2xl">
            {/* Rich text body container */}
            <article
              className="prose prose-invert prose-orange max-w-none text-text-secondary font-body leading-relaxed space-y-6 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Social Share bar */}
            <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-text-secondary font-body">
                Share this post
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-border bg-bg-card hover:bg-bg-hover text-green-400 flex items-center justify-center transition-all"
                  title="Share on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-border bg-bg-card hover:bg-bg-hover text-blue-400 flex items-center justify-center transition-all"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full border border-border bg-bg-card hover:bg-bg-hover text-text-primary flex items-center justify-center transition-all"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Sticky TOC Sidebar (col-span-1) */}
          <div className="lg:col-span-1">
            {headings.length > 0 && (
              <div className="sticky top-24 bg-bg-card border border-border rounded-xl p-5 shadow-xl space-y-4">
                <h4 className="font-heading font-bold text-sm text-text-primary uppercase tracking-wider">
                  Table of Contents
                </h4>
                <ul className="space-y-2.5 text-xs font-body text-text-secondary">
                  {headings.map((heading, idx) => (
                    <li key={idx} className="hover:text-accent transition-colors font-medium">
                      <a href={`#heading-${idx}`} className="line-clamp-1">
                        {heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border/40">
            <SectionHeader
              title="Related Publications"
              subtitle="Keep reading about gears, weather updates, and beginners checklists for Himalayan paths."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <div key={b._id}>
                  <BlogCard blog={b} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
