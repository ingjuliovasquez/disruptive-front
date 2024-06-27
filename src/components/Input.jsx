export default function Input({ label, error = false, textarea = false, ...props }) {

    const propsInput = { ...props }
    delete propsInput.label
    delete propsInput.error
    delete propsInput.textarea

    function getColor() {
        if (error) {
            return "border-red-700 bg-red-50"
        }
        return "border-gray-300 bg-gray-50"
    }

    return (
        <div className="my-2" >
            <label className="block mb-0 text-sm font-medium text-gray-900">
                {label}
            </label>
            {
                textarea
                    ? <textarea className={` border ${getColor()} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none`}
                        rows={5}
                        {...propsInput} />
                    : <input
                        className={` border ${getColor()} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        {...propsInput}
                    />
            }
        </div>
    )
}
