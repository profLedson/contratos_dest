
type TopFormProp = {
    status?: string
    currentYear?: string
}


function LabelStatusForm({ status, currentYear }: TopFormProp) {
    return (
        <div className="bg-gray-300 flex w-full items-center justify-between px-6 text-sm font-semibold py-1 my-0">
            <p>{status}</p>
            <p  className="px-10">
                {currentYear}
            </p>
        </div>
    )
}

export default LabelStatusForm