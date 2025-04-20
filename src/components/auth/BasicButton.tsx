

const BasicButton = ({
    label="Button",
    onClick,
    isLoading=false,
    loadingText="Loading...",
    disabled=false,
    className="",
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${className}`}
        >
            {isLoading ? loadingText : label}
        </button>
    )
}



export default BasicButton