# Final Project

~

Greetings,

Top 100 Movies built with... Gatsby / GraphQL + multiple APIs + CI/CD + ESLint/Jest Testing + Netlify Serverless Function + Algolia Search

The following steps should be hopefully somewhat straightforward to run.

git clone git@github.com:cscie114/csci-e-114-final-project-peaceharmony.git

npm install

Please check the separately submitted .env Environment Variables to create your .env file -- there are several (ALGOLIA, OMDB, YOUTUBE) that are used and this would simply save a good amount of time having to acquire them all.

Then from there, either "gatsby develop" (ok), or even better install the Netlify CLI (great) and then enter : "ntl dev"

If just "gatsby develop", then the Local URL will be http://localhost:8000/ - and this should build with 0 errors and render all pages - except that on an individual movie page there won't be up to the minute Movie Comments. This is a Netlify Serverless Function and for this to work we must deploy to GitHub which will automatically Lint, Test, Build, and then send to Netlify. 

If "ntl dev", then the Local URL will be http://localhost:8888/ - and this should build with 0 errors and render all pages including even a Locally implemented Serverless Function with up to the minute Movie Comments for all 100 Movies. Also, at Netlify be sure to turn off automatic builds & deploys... "Stopped builds. Netlify will not build your site automatically. You can build locally via the CLI and then publish new deploys manually via the CLI."

Tokens & Keys :

The secrets.GITHUB_TOKEN is created automatically by GitHub and is apparently a one time token (it refreshes) and ensures security for the Deploy.

Add your secrets.OMDB_API_KEY to GitHub in order to access the OMDB Data.

Add your secrets.YOUTUBE_API_KEY to Netlify - by the way, this is not needed at GitHub because this is for the Serverless Function.

Add your secrets.NETLIFY_AUTH_TOKEN and secrets.NETLIFY_SITE_ID, both created at Netlify, into your GitHub Repository. This allows GitHub to Push to Netlify.

Add your ALGOLIA Keys to GitHub, these are needed in the Build / Indexing that is performed there.

Also, my Netlify URL is...

https://ADD_HERE.netlify.app/

## Thank You So Much !! :-)
