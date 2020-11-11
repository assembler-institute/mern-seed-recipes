import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { signout } from "../../user/user-actions";

import Header from "../../../components/Header/Header";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
