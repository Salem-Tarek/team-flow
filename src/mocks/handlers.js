// import { handlers as userHandlers } from "~/modules/users/mocks/index.js"
// import { handlers as teamHandlers } from "~/modules/teams/mocks/index.js"

// export const handlers = [
//     ...userHandlers,
//     ...teamHandlers,
// ]

const modules = import.meta.glob('../modules/**/mocks/index.js', { eager: true });

export const handlers = Object.values(modules).flatMap((module) => module.handlers || []);