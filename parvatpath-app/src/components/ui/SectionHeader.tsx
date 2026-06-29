import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

export function SectionHeader({ title, subtitle, linkText, linkHref }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
      <div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-secondary text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-accent hover:text-accent-hover font-semibold text-sm transition-colors group flex items-center gap-1"
        >
          {linkText}
          <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      )}
    </div>
  );
}
