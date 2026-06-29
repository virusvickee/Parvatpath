import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, hover = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-card border border-border rounded-xl p-5 overflow-hidden transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 hover:border-border/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
