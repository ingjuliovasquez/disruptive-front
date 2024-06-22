export default function Button({ children, variant = "", ...props }) {

    const buttonProps = { ...props }
    delete buttonProps.variant;
    delete buttonProps.children;

    function getVariant() {
        if (variant === "green") { return "bg-green-500 hover:bg-green-400 text-white" }
        if (variant === "red") { return "bg-red-500 hover:bg-red-400 text-white" }
        if (variant === "gray") {return "flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 " }
        return "bg-blue-500 hover:bg-blue-400 text-white";
    }

    return (
        <button className={`px-5 py-2 rounded-xl ${getVariant()} font-bold w-fit`} {...buttonProps} >
            {children}
        </button>
    )
}
