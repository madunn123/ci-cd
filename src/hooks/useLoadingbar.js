import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export default function UseLoadingbar(loading) {
    const dispatch = useDispatch();
    const [loadings, setLoadings] = useState(false);

    useEffect(() => {
        if (loading) {
            setLoadings(true);
        } else {
            setLoadings(false);
        }
    }, [loading]);

    useEffect(() => {
        if (loadings) {
            dispatch(showLoading());
        } else {
            dispatch(hideLoading());
        }
    }, [dispatch, loadings]);
}
