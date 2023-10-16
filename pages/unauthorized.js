import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div className="unauthorized-container bg-black text-center">
      <h1 className="text-white">Access Denied</h1>
      {message && <div className="message text-danger">{ message }</div>}
      </div>
    </Layout>
  )
}

export default Unauthorized;