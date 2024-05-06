import PropTypes from 'prop-types';
import Navbar from '../common/Navbar';
import BottomBar from '../common/BottomBar';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { authState } from '../../redux/reducers/authSlice';
import { Link, useLocation } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

export default function GetLayout({ children }) {
    const { user } = useSelector(authState);
    const { pathname } = useLocation();

    return (
        <main className='relative flex flex-col h-full gap-5'>
            <div className="flex flex-col gap-0">
                <Navbar />
                <LoadingBar />
            </div>

            <BottomBar />

            {user !== null && pathname === '/' && (
                <div className="fixed hidden sm:block bottom-28 right-20">
                    <Link to="/thread/create">
                        <div className="p-2 duration-500 delay-300 rounded-full bg-slate-300 hover:-translate-y-4 hover:bg-green-600 text-slate-500 hover:text-slate-100">
                            <AiOutlinePlus size={30} />
                        </div>
                    </Link>
                </div>
            )}

            {children}
        </main>
    )
}

GetLayout.propTypes = {
    children: PropTypes.node
}