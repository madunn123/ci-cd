import { useRef } from "react";
import { useDispatch } from "react-redux"
import { asyncComment } from "../../redux/reducers/commnetSlice";

export default function ThreadComment(id) {
    const dispatch = useDispatch();

    const formRef = useRef();

    const handleSubmit = () => {
        const formData = new FormData(formRef.current);
        dispatch(asyncComment({ id: id?.id, content: formData.get('content') }))
    }

    return (
        <form
            ref={formRef}
            className="flex flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <textarea
                name="content"
                rows={10}
                placeholder="comment"
                className="p-2 text-sm bg-transparent outline-none ring-1 ring-slate-400 placeholder:capitalize"
            />
            <button type="submit" className="p-2 text-sm font-semibold uppercase bg-green-600 text-slate-100">Kirim</button>
        </form>
    )
}
