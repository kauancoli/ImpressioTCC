export const SkeletonItem: React.FC = () => {
  return (
    <div className="mb-5 animate-pulse">
      <div className="relative bg-gray-700 rounded-3xl h-[300px] w-full mb-2"></div>
      <div className="bg-gray-700 h-5 w-3/4 rounded mb-1"></div>
      <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
    </div>
  );
};
