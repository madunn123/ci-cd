import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncLogin, authState } from "../redux/reducers/authSlice";

export default function Login() {
    const dispatch = useDispatch();

    const formRef = useRef();
    const navigate = useNavigate();

    const { loadingAsyncLogin, errorAsyncLogin, token } = useSelector(authState);

    const handleSubmit = () => {
        const formData = new FormData(formRef.current);

        dispatch(asyncLogin({ email: formData.get('email'), password: formData.get('password') }))
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <section className="flex items-center justify-center h-[70vh]">
            <div className="p-10 py-16 shadow-lg shadow-slate-500/15 min-w-[330px] sm:max-w-[600px] sm:min-w-[600px]">

                <div className="flex flex-col gap-3">
                    <h1 className="m-0 text-xl font-semibold uppercase text-slate-500">login</h1>
                    {errorAsyncLogin && <small className="p-1 text-red-600 border-l-2 border-red-600 bg-red-600/15">Error dulu masbroo</small>}
                    {token && <small className="p-1 text-green-600 border-l-2 border-green-600 bg-green-600/15">Success dulu masbroo</small>}
                    <form
                        ref={formRef}
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <input
                            type="text"
                            name="email"
                            className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="p-2 text-sm font-semibold uppercase duration-500 bg-green-600 sm:text-base hover:bg-green-500/50 text-slate-100 ring-1 ring-green-500"
                        >
                            {loadingAsyncLogin ? 'loading...' : "login"}
                        </button>
                    </form>

                    <span className="text-xs text-slate-400">
                        belum punya akun?
                        {' '}
                        <Link to="/register" className="font-bold capitalize text-slate-700">register sekarang</Link>
                    </span>
                </div>
            </div>
        </section>
    )
}