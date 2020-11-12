import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import { login, signUp, signout } from "../user-actions";
import UserTypes from "../user-types";

import { getInitialReduxStoreUserState } from "../../../utils/tests";

import makeTestingServer from "../../../__mocks__/user/mock-user-service";

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

const userData = {
  testUser,
  testPayload,
};

const server = makeTestingServer({ userData });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("user thunk actions tests", () => {
  const mockStore = configureStore([thunk]);

  test("signs up and dispatches the results", async () => {
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
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("logs in and dispatches the results", async () => {
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

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("can sign out and dispatch the result", async () => {
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

    expect(store.getActions()).toEqual(expectedActions);
  });
});
