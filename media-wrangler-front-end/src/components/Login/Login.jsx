import React from "react"

export default function signInForm() {
    return (
        <div>
            <div class="field">
                <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" placeholder="Username" value={username}></input>
            </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" placeholder="Password" value={password}></input>
            </div>
            </div>

            <div class="control">
                <button type="submit">Submit</button>
            </div>
        </div>
    )
}

