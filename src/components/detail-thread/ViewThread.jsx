import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import { asyncDownVoteThread, asyncNeutralizeVoteThread, asyncUpVoteThread } from '../../redux/reducers/voteSlice';

export default function ViewThread({ thread }) {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <div className="wrapper">
                <span className="p-2 px-4 text-sm ring-1 ring-slate-400 text-slate-400">
                    #{thread?.category}
                </span>
            </div>

            <div className="flex flex-col gap-1 sm:gap-3">
                <h1 className="m-0 text-xl font-semibold sm:text-2xl">{thread?.title}</h1>

                <p className="m-0 text-xs sm:text-sm text-slate-500">{thread?.body}</p>
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

                <span className="text-xs sm:text-sm text-slate-500">
                    <TimeAgo date={thread?.createdAt} />
                </span>
                <span className="text-xs sm:text-sm text-slate-500">
                    Dibuat oleh <b>{thread?.owner?.name}</b>
                </span>
            </div>
        </>
    )
}
