interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Максимальная ширина контента с едиными отступами */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
