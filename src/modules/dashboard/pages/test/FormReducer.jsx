
import { useReducer, useRef } from "react";
const initialState = {
    formData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.fieldName]: action.value
                }
            }
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            }
        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.payload
            }
        case 'SUBMIT_SUCCESS':
            return {
                ...state,
                isSubmitted: true,
                isSubmitting: false,
                errors: {}
            }
        case 'RESET_FORM':
            return initialState
        default:
            return state
    }
}


function FormReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const submitAttempts = useRef(0);

    function validateForm(formData) {
        const { fullName, email, password, confirmPassword } = formData;
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = (email) => emailRegex.test(email);

        if (!fullName.trim()) {
            errors.fullName = "Full name is required"
        }

        if (!(email || email.trim())) {
            errors.email = "Email is required"
        } else {
            if (!isValidEmail(email)) {
                errors.email = "Invalid Email"
            }
        }

        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters"
        }

        if (!password.trim()) {
            errors.password = "Password is required"
        }

        if (!confirmPassword.trim()) {
            errors.confirmPassword = "Confirm Password is required"
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = "Passwords do not match"
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitAttempts.current == 3) {
            alert('Try again later')
            return
        }
        const errors = validateForm(state.formData)
        if (errors && Object.keys(errors)?.length) {
            dispatch({ type: 'SET_ERRORS', payload: errors })
            submitAttempts.current = submitAttempts.current + 1;
            return;
        }

        dispatch({ type: 'SET_SUBMITTING', payload: true })
        setTimeout(() => {
            dispatch({ type: 'SUBMIT_SUCCESS' })
            if (state.isSubmitted) {
                alert('Submitted Successfully')
            }
        }, 1000)
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
                Create Account
            </h2>
            {state.isSubmitted && (
                <button className="btn" onClick={() => dispatch({ type: 'RESET_FORM' })}>Reset Form</button>
            )}
            {state.isSubmitted ? (
                <div>
                    <h2 className="text-xl text-success">
                        Thank you for your submittion
                    </h2>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className={`space-y-4 ${state.isSubmitting ? 'cursor-wait' : ''}`}>

                        <div>
                            <label className="label">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                disabled={state.isSubmitting}
                                value={state.formData.fullName}
                                onChange={(e) => dispatch({
                                    type: 'UPDATE_FIELD',
                                    fieldName: 'fullName',
                                    value: e.target.value
                                })}
                                className="input input-bordered w-full"
                                placeholder="Enter your name"
                            />
                            {state.errors?.fullName && (<span className="text-error text-xs font-semibold">{state.errors.fullName}</span>)}
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                disabled={state.isSubmitting}
                                value={state.formData.email}
                                onChange={(e) => dispatch({
                                    type: 'UPDATE_FIELD',
                                    fieldName: 'email',
                                    value: e.target.value
                                })}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                            />
                            {state.errors?.email && (<span className="text-error text-xs font-semibold">{state.errors.email}</span>)}
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                disabled={state.isSubmitting}
                                value={state.formData.password}
                                onChange={(e) => dispatch({
                                    type: 'UPDATE_FIELD',
                                    fieldName: 'password',
                                    value: e.target.value
                                })}
                                className="input input-bordered w-full"
                                placeholder="Enter your password"
                            />
                            {state.errors?.password && (<span className="text-error text-xs font-semibold">{state.errors.password}</span>)}
                        </div>

                        <div>
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                disabled={state.isSubmitting}
                                value={state.formData.confirmPassword}
                                onChange={(e) => dispatch({
                                    type: 'UPDATE_FIELD',
                                    fieldName: 'confirmPassword',
                                    value: e.target.value
                                })}
                                className="input input-bordered w-full"
                                placeholder="Confirm your password"
                            />
                            {state.errors?.confirmPassword && (<span className="text-error text-xs font-semibold">{state.errors.confirmPassword}</span>)}
                        </div>

                        <button type="submit" disabled={state.isSubmitting || submitAttempts.current} className={`btn btn-primary w-full ${state.isSubmitting ? 'cursor-wait' : ''}`}>
                            Register
                        </button>

                    </form>
                    {(submitAttempts.current > 0) && (
                        <span className="text-error text-xs font-bold">{`You have submitted the form ${submitAttempts.current} times you still has ${3 - submitAttempts.current} Time`}</span>
                    )}
                    {(submitAttempts.current === 3) && (
                        <>
                            <br />
                            <span className="text-error text-xs font-bold">You can't submit now, try again later</span>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default FormReducer;
