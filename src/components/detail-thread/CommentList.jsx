import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'react-timeago'
import { asyncDownVoteComment, asyncNeutralizeVoteComment, asyncUpVoteComment } from '../../redux/reducers/voteSlice';


export default function CommentList({ thread, id }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="m-0 font-medium capitalize">
                Komentar ({thread?.comments?.length})
            </h1>

            {thread?.comments?.map((item) => (
                <div key={item?.id} className="flex flex-col gap-3 pb-3 border-b border-slate-300">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <img src={item?.owner?.avatar} alt="avatar" className="w-8 h8 sm:w-10 sm:h-10" />
                            <span className="text-sm font-medium capitalize sm:text-base">{item?.owner?.name}</span>
                        </div>

                        <small className="text-xs">
                            <TimeAgo date={item?.createdAt} />
                        </small>
                    </div>

                    <p className="m-0">{item?.content}</p>

                    <div className="flex flex-row items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            className="flex flex-row items-center gap-2"
                            onClick={() => {
                                item?.upVotesBy.includes(user?.id) ? dispatch(asyncNeutralizeVoteComment({ threadId: id, comment: item })) : dispatch(asyncUpVoteComment({ threadId: id, comment: item }))
                            }}
                        >
                            <AiOutlineLike className={`text-lg sm:text-xl ${item?.upVotesBy.includes(user?.id) ? 'text-red-600' : 'text-slate-500'}`} />
                            <small className="text-xs sm:text-sm">
                                {item?.upVotesBy?.length}
                            </small>
                        </button>

                        <button
                            type="button"
                            className="flex flex-row items-center gap-2"
                            onClick={() => {
                                item?.downVotesBy.includes(user?.id) ? dispatch(asyncNeutralizeVoteComment({ threadId: id, comment: item })) : dispatch(asyncDownVoteComment({ threadId: id, comment: item }))
                            }}
                        >
                            <AiOutlineDislike className={`text-lg sm:text-xl ${item?.downVotesBy.includes(user?.id) ? 'text-red-600' : 'text-slate-500'}`} />
                            <small className="text-xs sm:text-sm">
                                {item?.downVotesBy?.length}
                            </small>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
