import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async signIn(info) {
      console.log("Sign In Callback::", info);
      // @ts-ignore
      if (info?.profile?.data?.username && info.account) {
        // @ts-ignore
        info.account.username = info?.profile?.data?.username;
      }
      return true;
    },
    async jwt({ token, account }) {
      console.log("jwt token::", token);
      console.log("jwt account::", account);
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        if (account.username) {
          token.username = account.username;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log("session", session);
      console.log("user", user);
      console.log("token", token);

      // // eslint-disable-next-line no-param-reassign
      if (token.sub) {
        session.sub = token.sub;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.jti) {
        session.jti = token.jti;
      }
      if (token.provider) {
        session.provider = token.provider;
      }

      // // eslint-disable-next-line no-param-reassign
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      console.log("session", {
          ...session,
          user: {
            ...session.user,
            username: token.username,
          },
        });
      
        return {
          ...session,
          user: {
            ...session.user,
            username: token.username,
          },
        };
    }
  },
}
export default NextAuth(authOptions)
