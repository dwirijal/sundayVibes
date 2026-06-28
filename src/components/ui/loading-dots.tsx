export interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ className = '', size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-primary animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${sizeClasses[size]} rounded-full bg-primary animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${sizeClasses[size]} rounded-full bg-primary animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}
