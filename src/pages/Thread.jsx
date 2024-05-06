import { useDispatch, useSelector } from 'react-redux';
import CategoryTabs from '../components/thread/CategoryTabs';
import { useEffect } from 'react';
import { asyncGetAllThread, threadState } from '../redux/reducers/threadSlice';
import { asyncGetAllUsers, userState } from '../redux/reducers/userSlice';
import UseLoadingbar from '../hooks/useLoadingbar';
import ThreadLists from '../components/thread/ThreadLists';


export default function Thread() {
    const dispatch = useDispatch();

    const { users, loading } = useSelector(userState);
    const { threads, selected, loadingGetAll } = useSelector(threadState);

    UseLoadingbar(loadingGetAll, loading);

    const threadList = threads?.map((item) => ({
        ...item,
        user: users?.find((u) => u?.id === item?.ownerId)
    }))

    const threadFilterByCategory = selected !== null ? threadList.filter((item) => item?.category === selected) : threadList;

    useEffect(() => {
        dispatch(asyncGetAllThread())
        dispatch(asyncGetAllUsers())
    }, [])

    // add

    return (
        <section className="container px-4 pb-20 sm:px-28">
            <div className="flex flex-col gap-6">
                <CategoryTabs category={threads} selected={selected} />

                <h1 className="m-0 text-base font-bold uppercase xl:text-lg text-slate-600">diskusi tersedia</h1>

                <ThreadLists
                    threads={threadFilterByCategory}
                />
            </div>
        </section>
    )
}