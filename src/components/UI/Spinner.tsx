const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 animate-fade-in">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500 tracking-wide animate-pulse">
        Loading data, please wait...
      </p>
    </div>
  );
};

export default Spinner;
