import ACTION from "./actionTypes"

export function onLoginRequest() {
	return {
		type: ACTION.LOGIN_REQUEST,
	}
}

export function onLoginSuccess() {
	return {
		type: ACTION.LOGIN_SUCCESS,
	}
}

export function onLoginFailure() {
	return {
		type: ACTION.LOGIN_FAILURE,
	}
}

export function onSignoutRequest() {
	return {
		type: ACTION.SIGNOUT_REQUEST,
	}
}

export function onSignoutSuccess() {
	return {
		type: ACTION.SIGNOUT_SUCCESS,
	}
}

export function onSignoutFailure() {
	return {
		type: ACTION.SIGNOUT_FAILURE,
	}
}
