# Ai Finance Management Platform 
** Steps **
 npx create-next-app@latest

![alt text](image.png)

1.	https://ui.shadcn.com/  -- these are prebuild component which we can copy and paste and install in our apps
2.	Shadcian ui build on top of tailwind css Next.js
Install and configure shadcn/ui for Next.js.
3.	npx shadcn@latest init
4.	choose--   Use --legacy-peer-deps  -> so that all of the pkg compatible with react 19 and next.js 15
5.	npx shadcn@latest add button
6.	paste in postcss.config.mjs -> 
7.	const config = {  plugins: {    "@tailwindcss/postcss": {},  },};export default config;
8.	npx shadcn@latest add badge calendar card checkbox drawer dropdown-menu input                   popover progress select switch table tooltip
9.	 progress – used to  ->> to show the progress to what are budget right now
10.	Select – for from 



** Authentication login and signup
User Management Platform  https://clerk.com/  
Signup then will get option----
1.	npm install @clerk/nextjs --legacy-peer-deps

2.	Set your Clerk API keys
.env variable  -> these are the secret keys which we used to connect to cleark server so that it can make our authentication possible 
3.	Update middleware.ts
4.	Wrap app with cleark provider - ``` layout.js
5.  Craeted Some Public Route And Private Route and Group them also.
6.  Created folder under app/(auth) --> and we wrap  --> so that is will not consider as a route.
7.  Also Ctreated Catch All Route --> It allow us to add after the url ex: sign-in, sign-up.
[[sign-in]] and moved in that page.jsx

## Sign in and Sign up
craeet in root .env file 
``` bash 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGFybGluZy1kb3J5LTU4LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ej02brilxzwBOe9XOdnNIkysllwgChU2vNW6HmtdBs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=sign-up```

 https://clerk.com/   -- we will get on this website
## Clerk - Used for authontication
 Clerk is a authentication service that provides a simple and secure way to manage user authentication.

## We will Configure and add protected Roote 
- We will add a protected route to our middleware.js.


