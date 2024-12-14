import PropTypes from "prop-types";

const Loading = ({
  size = "medium",
  text = "Đang tải...",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div
          className={`
            ${sizeClasses[size]}
            border-4 border-t-4
            border-gray-200
            border-t-orange-500
            rounded-full
            animate-spin
          `}
        />
        {text && <p className="text-gray-700 text-sm mt-2">{text}</p>}
      </div>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Loading;