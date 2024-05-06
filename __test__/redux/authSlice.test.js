/**
 * test scenario for authSlice
 *
 * 1. authReducer
 * - should return empty user & token state when given by logout action
 * - should return dataAsyncRegister, loadingAsyncRegister & errorAsyncRegister state when given by asyncRegister action
 * - should return dataAsyncLogin, loadingAsyncLogin & errorAsyncLogin state when given by asyncLogin action
 * - should return dataAsyncMe, loadingAsyncMe & errorAsyncMe state when given by asyncMe action
 *
 * 2. asyncThunks
 * - should return user when given by asyncRegister thunk
 * - should return error when given by asyncRegister thunk
 * - should return token when given by asyncLogin thunk
 * - should return error when given by asyncLogin thunk
 * - should return user when given by asyncMe thunk
 * - should return error when given by asyncMe thunk
 */

import authReducer, { asyncRegister, asyncLogin, asyncMe, logout } from "../../src/redux/reducers/authSlice";
import userService from "../../src/services/userService";

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const fakeUser = {
    email: 'johndoe@gmail.com',
    name: 'john doe',
};

const fakeRegister = {
    ...fakeUser,
    password: '12345678'
}

const { name, ...fakeLogin } = fakeRegister;

const fakeToken = name;

const fakeError = new Error('Something went wrong');

describe('authSlice', () => {
    describe('reducers', () => {
        it('should return the initial state when given by unknown action', () => {
            const initialState = {};
            const action = { type: 'UNKNOWN' };

            const nextState = authReducer(initialState, action);
            expect(nextState).toEqual(initialState);
        })

        it('should return empty user & token state when given by logout action', () => {
            const initialState = { user: fakeUser, token: 'abcd' };
            const action = { type: logout.type };

            const nextState = authReducer(initialState, action);

            expect(nextState).toEqual({ user: null, token: null });
        });

        it('should return dataAsyncRegister, loadingAsyncRegister & errorAsyncRegister state when given by asyncRegister action', () => {
            const initialState = {};
            const action = { type: asyncRegister.fulfilled, payload: fakeUser };

            const nextState = authReducer(initialState, action);

            expect(nextState).toEqual({
                dataAsyncRegister: fakeUser,
                loadingAsyncRegister: false,
            })
        })

        it('should return dataAsyncLogin, loadingAsyncLogin & errorAsyncLogin state when given by asyncLogin action', () => {
            const initialState = {};
            const action = { type: asyncLogin.fulfilled, payload: fakeToken };

            const nextState = authReducer(initialState, action);

            expect(nextState).toEqual({
                dataAsyncLogin: fakeToken,
                loadingAsyncLogin: false,
                token: fakeToken,
            })
        })

        it('should return dataAsyncMe, loadingAsyncMe & errorAsyncMe state when given by asyncMe action', () => {
            const initialState = {};
            const action = { type: asyncMe.fulfilled, payload: fakeUser };

            const nextState = authReducer(initialState, action);

            expect(nextState).toEqual({
                loadingAsyncMe: false,
                user: fakeUser,
            })
        })
    })

    describe('asyncThunks', () => {
        beforeEach(() => {
            userService._register = userService.register;
            userService._login = userService.login;
            userService._me = userService.me;
            userService._users = userService.users;
        });

        it('should return user when given by asyncRegister thunk', async () => {
            userService.register = vi.fn().mockResolvedValue(fakeUser);

            const dispatch = vi.fn();
            const getState = vi.fn();

            await asyncRegister(fakeRegister)(dispatch, getState, {});

            expect(userService.register).toHaveBeenCalledWith(fakeRegister);

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncRegister.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncRegister.fulfilled.type,
                    payload: fakeUser,
                }),
            );
        });

        it('should return error when given by asyncRegister thunk', async () => {
            userService.register = vi.fn().mockRejectedValue(fakeError);

            const dispatch = vi.fn();

            await asyncRegister(fakeRegister)(dispatch);

            expect(userService.register).toHaveBeenCalledWith(fakeRegister);

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncRegister.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncRegister.rejected.type,
                }),
            );
        });

        it('should return token when given by asyncLogin thunk', async () => {
            userService.login = vi.fn().mockResolvedValue(fakeToken);

            const dispatch = vi.fn();
            const getState = vi.fn();

            await asyncLogin(fakeLogin)(dispatch, getState, {});

            expect(userService.login).toHaveBeenCalledWith(fakeLogin);

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncLogin.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncLogin.fulfilled.type,
                    payload: fakeToken,
                }),
            );
        });

        it('should return error when given by asyncLogin thunk', async () => {
            userService.login = vi.fn().mockRejectedValue(fakeError);

            const dispatch = vi.fn();

            await asyncLogin(fakeLogin)(dispatch);

            expect(userService.login).toHaveBeenCalledWith(fakeLogin);

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncLogin.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncLogin.rejected.type,
                }),
            );
        });

        it('should return user when given by asyncMe thunk', async () => {
            userService.me = vi.fn().mockResolvedValue(fakeToken);

            const dispatch = vi.fn();
            const getState = vi.fn();

            await asyncMe()(dispatch, getState, {});

            expect(userService.me).toHaveBeenCalled();

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncMe.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncMe.fulfilled.type,
                    payload: fakeToken,
                }),
            );
        });

        it('should return error when given by asyncMe thunk', async () => {
            userService.me = vi.fn().mockRejectedValue(fakeError);

            const dispatch = vi.fn();

            await asyncMe()(dispatch);

            expect(userService.me).toHaveBeenCalled();

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncMe.pending.type,
                }),
            );

            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: asyncMe.rejected.type,
                }),
            );
        });

        afterEach(() => {
            userService.register = userService._register;
            userService.login = userService._login;
            userService.me = userService._me;
            userService.getAll = userService._getAll;

            delete userService._register;
            delete userService._login;
            delete userService._me;
            delete userService._getAll;
        });
    })
})