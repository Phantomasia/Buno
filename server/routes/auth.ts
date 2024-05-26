import { Hono } from "hono";
import { kindeClient as Client, sessionManager } from "../kinde";
export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await Client.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await Client.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    // get called everytime we login or register
    const url = new URL(c.req.url);
    await Client.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await Client.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", async (c) => {
    const isAuthenticated = await Client.isAuthenticated(sessionManager(c)); // Boolean: true or false
    return c.json(isAuthenticated);
    // if (isAuthenticated) {
    //   console.log("Yes, User is Authenticated");
    // } else {
    //   console.log("Nope, User not Authenticated");
    // }
  });
