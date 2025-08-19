import type { FC } from 'react';

const LoadingSkeletons: FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          role="presentation"
          aria-label="Loading character placeholder"
          className="w-[150px] h-[250px] bg-gray-300 rounded-lg animate-pulse duration-[1500ms]"
        />
      ))}
    </div>
  );
};

export default LoadingSkeletons;
