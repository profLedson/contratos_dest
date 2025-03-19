
type TopFormProp = {
    title?: string
    currentYear?: string
}


function LabelTopForm({ title, currentYear }: TopFormProp) {
    return (
        <div className="bg-gray-300 flex w-full items-center justify-between py-2 px-6 text-[1.3rem] font-semibold rounded-sm">
            <p>
                {title?.toUpperCase()}
            </p>
            <p  className="bg-gray-50 px-5 rounded-full">
                {currentYear}
            </p>
        </div>
    )
}

export default LabelTopForm