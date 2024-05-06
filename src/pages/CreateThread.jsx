import { useRef } from "react"
import { useDispatch } from "react-redux";
import { asyncCreateThread } from "../redux/reducers/threadSlice";
import { useNavigate } from "react-router-dom";

export default function CreateThread() {
    const dispatch = useDispatch();

    const formRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const formData = new FormData(formRef.current);

        dispatch(asyncCreateThread({ title: formData.get('title'), category: formData.get('category'), body: formData.get('body') }))
        navigate('/');
    }

    return (
        <section className="container px-4 pb-20 sm:px-28">
            <div className="flex flex-col gap-4 sm:gap-6">
                <h1 className="m-0 text-lg font-semibold capitalize sm:text-xl">Buat Diskusi Baru</h1>

                <form
                    ref={formRef}
                    className="flex flex-col gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <input
                        type="text"
                        name="title"
                        className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        name="category"
                        className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                        placeholder="Category"
                    />
                    <textarea
                        type="text"
                        name="body"
                        rows={10}
                        className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                        placeholder="Body"
                    />
                    <button type="submit" className="p-2 text-xs font-semibold uppercase bg-green-600 ring-1 ring-green-600 sm:text-sm text-slate-100">Buat</button>
                </form>
            </div>
        </section>
    )
}