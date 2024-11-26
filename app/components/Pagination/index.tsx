const Pagination: React.FC = () => {
    return (
        <div className="w-full flex justify-center gap-7 text-[20px]">
            <button className="text-white bg-ochre rounded-lg w-12 h-12">1</button>
            <button className="text-black bg-[#F9F1E7] rounded-lg w-12 h-12">2</button>
            <button className="text-black bg-[#F9F1E7] rounded-lg w-12 h-12">3</button>
            <button className="text-black bg-[#F9F1E7] rounded-lg px-8 h-12">Next</button>
        </div>
    )
}

export default Pagination
