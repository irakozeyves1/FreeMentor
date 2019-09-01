import app from './app';

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port: ${port}`));
export default server;
