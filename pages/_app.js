import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// MyApp.getInitialProps = async (appContext) => {
//   // Establish MongoDB connection
//   if (!appContext.ctx.db) {
//     // Check if MongoDB connection already exists
//     const db = await connectToDatabase();

//     // Pass MongoDB connection as a prop to all pages
//     appContext.ctx.db = db;
//   }

//   let appProps = {};
//   if (typeof appContext.Component.getInitialProps === 'function') {
//     appProps = await appContext.Component.getInitialProps(appContext);
//   }

//   return { ...appProps };
// };

// process.on('beforeExit', async () => {
//   try {
//     // Close MongoDB connection when the application is shutting down
//     const db = await connectToDatabase();
//     await db.client.close();
//     console.log('MongoDB connection closed');
//   } catch (error) {
//     console.error('Error closing MongoDB connection:', error);
//     process.exit(1);
//   }
// });
export default MyApp;
