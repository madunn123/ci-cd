function checkAuthMiddleware(store) {
    return (next) => (action) => {
        const { user, token } = store.getState().auth;

        const requiresAuth = action.type.includes('asyncUpVoteThread') ||
            action.type.includes('asyncDownVoteThread') ||
            action.type.includes('asyncUpVoteComment') ||
            action.type.includes('asyncDownVoteComment');

        if (requiresAuth && (!user || !token)) {
            alert('You must be logged in to perform this action.');
            return;
        }

        return next(action);
    }
}


export { checkAuthMiddleware };