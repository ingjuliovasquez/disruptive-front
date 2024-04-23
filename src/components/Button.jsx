export default function Button({ children, variant = "", ...props }) {

    const buttonProps = { ...props }
    delete buttonProps.variant;
    delete buttonProps.children;

    function getVariant() {
        if (variant === "green") { return "bg-green-500 hover:bg-green-400 text-white" }
        if (variant === "red") { return "bg-red-500 hover:bg-red-400 text-white" }
        return "bg-blue-500 hover:bg-blue-400 text-white";
    }

    return (
        <button className={`px-5 py-2 rounded-xl ${getVariant()} font-bold w-fit`} {...buttonProps} >
            {children}
        </button>
    )
}
