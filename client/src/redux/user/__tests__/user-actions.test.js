import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { login, signUp, signout } from "../user-actions";
import UserTypes from "../user-types";

import { getInitialReduxStoreUserState } from "../../../utils/tests";

describe("user thunk actions tests", () => {
  beforeEach(() => {
    // Clear previously set mocks so they do not bleed into other mocks
    fetch.resetMocks();
  });

  const mockStore = configureStore([thunk]);

  test("signs up and dispatches the results", async () => {
    const testUser = {
      name: "test_user_name",
      lastname: "test_user_lastname",
      email: "test_user_email",
      password: "test_user_password",
    };

    const testPayload = {
      name: "test_user_name",
      lastname: "test_user_lastname",
      email: "test_user_email",
      token: "test_user_token",
    };

    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          user: testUser,
          token: testPayload.token,
        },
        error: null,
      }),
      {
        status: 200,
      },
    );

    const expectedActions = [
      {
        type: UserTypes.SIGNUP_REQUEST,
      },
      {
        type: UserTypes.SIGNUP_SUCCESS,
        payload: testPayload,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      signUp({
        name: testUser.name,
        lastname: testUser.lastname,
        email: testUser.email,
        password: testUser.password,
      }),
    );

    expect(fetch.mock.calls[0][0]).toMatch(/\/user\/sign-up/);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("logs in and dispatches the results", async () => {
    const testUser = {
      name: "test_user_name",
      lastname: "test_user_lastname",
      email: "test_user_email",
      password: "test_user_password",
    };

    const testPayload = {
      name: "test_user_name",
      lastname: "test_user_lastname",
      email: "test_user_email",
      token: "test_user_token",
    };

    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          user: testUser,
          token: testPayload.token,
        },
        error: null,
      }),
      {
        status: 200,
      },
    );

    const expectedActions = [
      {
        type: UserTypes.LOGIN_REQUEST,
      },
      {
        type: UserTypes.LOGIN_SUCCESS,
        payload: testPayload,
      },
    ];

    const store = mockStore();
    await store.dispatch(
      login({
        email: testUser.email,
        password: testUser.password,
      }),
    );

    expect(fetch.mock.calls[0][0]).toMatch(/\/user\/login/);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("can sign out and dispatch the result", async () => {
    fetch.mockResponseOnce({}, { status: 200 });

    const expectedActions = [
      {
        type: UserTypes.SIGNOUT_REQUEST,
      },
      {
        type: UserTypes.SIGNOUT_SUCCESS,
      },
    ];

    const store = mockStore(getInitialReduxStoreUserState());
    await store.dispatch(signout());

    expect(fetch.mock.calls[0][0]).toMatch(/\/user\/logout/);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
