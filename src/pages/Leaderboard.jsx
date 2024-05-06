import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncLeaderboard, leaderboardState } from "../redux/reducers/leaderboardSlice";
import UseLoadingbar from "../hooks/useLoadingbar";

export default function Leaderboard() {
    const dispatch = useDispatch();

    const { leaderboards, loading } = useSelector(leaderboardState);

    UseLoadingbar(loading);

    useEffect(() => {
        dispatch(asyncLeaderboard());
    }, []);

    return (
        <section className="container px-4 sm:px-28">
            <div className="flex flex-col gap-4 xl:gap-6">
                <h1 className="m-0 text-base font-bold capitalize xl:text-xl text-slate-700">klasmen pengguna aktif</h1>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-sm capitalize text-slate-500">pengguna</span>
                        <span className="text-sm capitalize text-slate-500">skor</span>
                    </div>

                    {leaderboards?.map((item) => (
                        <div key={item?.user?.id} className="flex flex-row items-center justify-between px-1 sm:px-0">
                            <div className="flex flex-row items-center gap-2">
                                <img
                                    src={item?.user?.avatar}
                                    alt="avatar"
                                    loading="lazy"
                                    className="object-cover w-8 h-8 sm:w-10 sm:h-10"
                                />
                                <span className="text-xs font-medium capitalize sm:text-base text-slate-600">{item?.user?.name}</span>
                            </div>
                            <span className="text-xs font-medium sm:text-base text-slate-600">{item?.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}