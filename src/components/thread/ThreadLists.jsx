import { AiOutlineDislike, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from "react-redux";
import { asyncDownVoteThread, asyncNeutralizeVoteThread, asyncUpVoteThread } from "../../redux/reducers/voteSlice";


export default function ThreadLists({ threads }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex flex-col gap-4">
            {threads?.map((thread) => (
                <div key={thread?.id} className="border-b-[1px] border-slate-300 text-sm flex flex-col gap-4 pb-2 sm:pb-3">
                    <div className="wrapper">
                        <span className="px-3 py-1 text-xs category ring-1 sm:text-sm ring-slate-400/80 text-slate-400/80 sm:px-3 sm:p-2">#{thread?.category}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Link to={`/thread/detail/${thread?.id}`}>
                            <h1 className="m-0 text-base font-medium duration-500 text-slate-800 hover:underline hover:text-green-500">
                                {thread?.title}
                            </h1>
                        </Link>

                        <div className="text-xs sm:text-sm text-slate-500">
                            {ReactHtmlParser(thread?.body)}
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            className="flex flex-row items-center gap-2"
                            onClick={() => {
                                thread?.upVotesBy.includes(user?.id) ? dispatch(asyncNeutralizeVoteThread(thread)) : dispatch(asyncUpVoteThread(thread))
                            }}
                        >
                            <AiOutlineLike className={`text-lg sm:text-xl ${thread?.upVotesBy?.includes(user?.id) ? 'text-red-600' : 'text-slate-500'}`} />
                            <small className="text-xs sm:text-sm">
                                {thread?.upVotesBy?.length}
                            </small>
                        </button>

                        <button
                            type="button"
                            className="flex flex-row items-center gap-2"
                            onClick={() => {
                                thread?.downVotesBy.includes(user?.id) ? dispatch(asyncNeutralizeVoteThread(thread)) : dispatch(asyncDownVoteThread(thread))
                            }}
                        >
                            <AiOutlineDislike className={`text-lg sm:text-xl ${thread?.downVotesBy?.includes(user?.id) ? 'text-red-600' : 'text-slate-500'}`} />
                            <small className="text-xs sm:text-sm">
                                {thread?.downVotesBy?.length}
                            </small>
                        </button>

                        <div className="flex flex-row items-center gap-2">
                            <AiOutlineShareAlt className="text-lg sm:text-xl" />
                            <small className="text-xs sm:text-sm">
                                {thread?.totalComments}
                            </small>
                        </div>

                        <span className="text-xs sm:text-sm text-slate-500">
                            <TimeAgo date={thread?.createdAt} />
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500">
                            Dibuat oleh <b>{thread?.user?.name}</b>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
