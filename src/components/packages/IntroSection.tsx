
const IntroSection = () => {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center md:justify-end border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
            <p className="text-lg text-gray-700">
              Choose the service level that best fits your property investment strategy.
            </p>
          </div>
          <div className="flex items-center md:pl-6">
            <p className="text-lg text-gray-700">
              Both packages include tenant screening, placement, rent collection, online owner portal and legal compliance assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
