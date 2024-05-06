import { useDispatch } from "react-redux"
import { setSelect } from "../../redux/reducers/threadSlice";

export default function CategoryTabs({ category, selected }) {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-2 category sm:gap-3">
            <span className="text-sm font-medium capitalize text-slate-500 sm:text-base">kategori popular</span>
            <div className="flex flex-row items-center gap-4 px-1 py-1 overflow-x-auto">
                {category.map((item) => (
                    <button
                        key={item?.id}
                        type="button"
                        onClick={() => dispatch(setSelect(item?.category === selected ? null : item?.category))}
                        className={`flex-none ring-1 text-xs sm:text-sm font-normal p-1.5 px-3 sm:p-2 sm:px-4 hover:ring-green-600 duration-500 hover:text-green-500 ${item?.category === selected ? 'ring-green-500 text-green-500' : 'ring-slate-400 text-slate-400'}`}
                    >
                        #{item?.category}
                    </button>
                ))}
            </div>
        </div>
    )
}
