import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';
import { Html5QrcodeScanner } from 'html5-qrcode';
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
let scanner; 

const ScanQrCode = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(true);

  useEffect(() => {
    if (Html5QrcodeScanner) {
        scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
            scanner.render(success, error);
            function success(result) {
                setScanResult(result);
            }

            function error(err) {
                console.warm(err)
            }
    }

        

  }, [Html5QrcodeScanner])

  return (
    <Layout>
      <div className="admin-container bg-black text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              <div className="card admin-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">Scan or Read QR Code</h1>

                  <div className="col-lg-6 col-md-12 col-sm-12 mx-auto justify-content-center">



                    <div id="reader"></div>
                    <div>{scanResult}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

ScanQrCode.auth = { adminOnly: true }
export default ScanQrCode;

