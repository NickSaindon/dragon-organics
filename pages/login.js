import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";

const Login = () => {
  const { data: session } = useSession();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
 

  const submitHandler = async ({email, password}) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email, 
        password: password,
      });

      if (!result.error) {
        return "Authorized Successful"
      }

      if (result.error) {
        toast.error(result.error, {
          theme: "colored"
        });
      }
      
    } catch (err) {
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  }

  return (
    <Layout 
      title="Login"
      description="Login and start purchasing your Thai botanicales today with Dragon Organics.  Our quality products and great prices are exactly what you have been looking for.">
      <div className="login-container bg-black text-white text-center">
        <main className="form-signin">
          <div className="row justify-content-md-center">
            <ToastContainer 
              position="top-center" 
              draggable={false} 
              transition={Slide} 
              autoClose={5000}
              hideProgressBar={true}
              className="toast-alert"
            />
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-4 col-md-12 col-sm-12 needs-validation" noValidate>
              <Image src="/images/do-logo-title-under.png" width={150} height={195} alt=""/>
              <h1 className="h3 mb-3 fw-normal">Please Signin</h1>
              <p>* If you don&apos;t have an account please click the register link below.</p>
              <div className="form-floating">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email" 
                      placeholder="name@example.com" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {errors.email
                    ? errors.email.type === 'pattern'
                      ? 'Email is not valid'
                      : 'Email is required'
                    : ''
                  }
                </div>
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6
                  }}
                  render={({ field }) => (
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password" 
                      placeholder="Password" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Password is more than 5'
                      : 'Password is required'
                    : ''
                  }
                </div>
                <label htmlFor="password">Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-outline-primary signin-btn light" type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-white">
                Don&apos;t have an account? &nbsp;
                <Link href="/register" className="text-primary">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Login;