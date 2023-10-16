import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import Image from "next/image";
import { getError } from '../utils/error';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";

const Profile = () => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session, setValue]);
    
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
    
  return (
    <Layout
      title="Profile Page">
      <div className="register-container bg-black text-white text-center">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <main className="form-register">
          <div className="row justify-content-md-center">
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-4 col-md-12 col-sm-12">
              <Image src="/images/do-logo-title-under.png" width={150} height={195} alt=""/>
              <h1 className="h3 py-3 mb-3 fw-normal">Please Register</h1>
              <p>
                <b>Disclaimer:</b> Must be of legal age to purchase these products. Dragon Organics will not ship to the following US states, counties, and 
                cities where kratom is banned: Alabama, Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), 
                Denver (CO), and San Diego (CA).  If you are ordering from any of these States or cities we will not ship and refund your order.
              </p>
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  placeholder="Full Name" 
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name.message}
                  </div>
                )}
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
                <label htmlFor="name">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 6, message: 'password is more than 5 chars' },
                  })}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Password"
                  autoFocus
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating">
                <input
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password" 
                  {...register('confirmPassword', {
                    required: 'Please enter confirm password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 chars',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="invalid-feedback">Password do not match</div>
                )}
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-outline-primary light" type="submit">
                Update
              </button>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Profile;