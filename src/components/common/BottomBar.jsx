import { AiOutlineLogin, AiOutlinePlus, AiOutlineWechat } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { authState, logout } from "../../redux/reducers/authSlice";

export default function BottomBar() {
    const dispatch = useDispatch();

    const { user } = useSelector(authState);
    const { pathname } = useLocation();

    return (
        <nav className="bg-stone-600 text-slate-100 py-3.5 fixed bottom-0 left-0 w-full">
            <div className="container flex flex-row items-center justify-center gap-16">
                <Link to="/">
                    <AiOutlineWechat className={`text-3xl ${pathname === '/' ? 'text-green-500' : 'text-slate-400'}`} />
                </Link>

                {user && (
                    <Link to="/thread/create" className="block sm:hidden">
                        <AiOutlinePlus className={`text-3xl ${pathname === '/leaderboard'? 'text-green-500' : 'text-slate-400'}`} />
                    </Link>
                )}

                <Link to="/leaderboard">
                    <MdLeaderboard className={`text-3xl ${pathname === '/leaderboard'? 'text-green-500' : 'text-slate-400'}`} />
                </Link>

                {user === null ? (
                    <Link to="/*">
                        <AiOutlineLogin className={`text-3xl ${pathname === '/*'? 'text-green-500' : 'text-slate-400'}`} />
                    </Link>
                ) : (
                    <button type="button" onClick={() => dispatch(logout())}>
                        <AiOutlineLogin className="text-3xl text-slate-400" />
                    </button>
                )}
            </div>
        </nav>
    )
}