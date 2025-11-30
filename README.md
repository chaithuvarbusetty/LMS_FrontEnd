# LMS Portal Frontend (Full)

## Install
npm install

## Run (dev)
npm run dev

Open http://localhost:3000

Make sure backend runs at http://localhost:8080. This frontend assumes JWTs returned by /api/auth endpoints contain standard claims or include `roles` or `authorities` array. If roles are different, tweak parseJwt in src/context/AuthContext.jsx
