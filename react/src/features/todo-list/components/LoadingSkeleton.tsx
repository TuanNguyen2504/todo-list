import { DEFAULT } from '~/constants/default';

export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mx-4">
      {Array(DEFAULT.PAGE_LIMIT)
        .fill(1)
        .map((_, index) => (
          <div key={index} className="rounded-lg animate-pulse bg-base-200 h-16"></div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;
