import { handlers as userHandlers } from "~/modules/users/mocks/index.js"
import { handlers as teamHandlers } from "~/modules/teams/mocks/index.js"

export const handlers = [
    ...userHandlers,
    ...teamHandlers,
]
