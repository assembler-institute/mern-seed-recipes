import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { signUp } from "../../user/user-actions";

import Signup from "../../../pages/Signup/Signup";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  signup: ({ name, lastname, email, password }) =>
    dispatch(signUp({ name, lastname, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
