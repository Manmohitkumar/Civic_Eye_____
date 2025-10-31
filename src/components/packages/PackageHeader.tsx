
interface PackageHeaderProps {
  title: string;
  description: string;
  price: string;
  pricePeriod: string;
  additionalInfo?: string;
}

const PackageHeader = ({ 
  title, 
  description, 
  price, 
  pricePeriod, 
  additionalInfo 
}: PackageHeaderProps) => {
  return (
    <div className="p-6 border-b border-gray-200 bg-white">
      <h3 className="text-2xl font-bold text-center mb-2 theme-primary-text">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
      <div className="text-center mt-4">
        <span className="text-3xl font-bold theme-primary-text">{price}</span>
        <span className="text-gray-600 ml-2">{pricePeriod}</span>
        {additionalInfo && (
          <p className="text-sm text-gray-600 mt-1">{additionalInfo}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">* Prices exclude GST</p>
      </div>
    </div>
  );
};

export default PackageHeader;

