import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { asyncGetDetail, getThreadById } from "../../redux/reducers/threadSlice";
import ViewThread from "../../components/detail-thread/ViewThread";
import ThreadComment from "../../components/detail-thread/ThreadComment";
import CommentList from "../../components/detail-thread/CommentList";
import { commentState } from "../../redux/reducers/commnetSlice";
import { authState } from "../../redux/reducers/authSlice";

export default function ThreadDetail() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const thread = useSelector((state) => getThreadById(state, id));
    const { data } = useSelector(commentState);
    const { user } = useSelector(authState);

    useEffect(() => {
        dispatch(asyncGetDetail(id));
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(asyncGetDetail(id));
        }
    }, [data])
    return (
        <section className="container px-4 pb-20 sm:px-28">
            <div className="flex flex-col gap-6">
                <ViewThread thread={thread} />

                <div className="flex flex-col gap-2">
                    <h1 className="m-0 text-sm font-semibold capitalize sm:text-base">beri komentar</h1>

                    {user !== null ? (
                        <ThreadComment id={id} />
                    ) : (
                        <Link to="/*" className="text-sm text-blue-500 underline">Anda harus login terlebih dahulu</Link>
                    )}
                </div>

                <CommentList thread={thread} id={id} />
            </div>
        </section>
    )
}