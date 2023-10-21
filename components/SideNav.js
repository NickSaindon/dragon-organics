import { useSession } from 'next-auth/react';
import Link from 'next/link'

const SideNav = () => {
  const { data: session } = useSession();

  return (
    <div className="card side-nav">
      <div className="card-body">
      {session.user.isAdmin &&
        <nav className="nav flex-column">
          <Link href="/admin/dashboard" className="nav-link active" aria-current="page">
            Dashboard
          </Link>
          <Link href="/admin/categories" className="nav-link">
            Categories
          </Link>
          <Link href="/admin/products" className="nav-link">
            Products
          </Link>
          <Link href="/admin/users" className="nav-link">
            Users
          </Link>
          <Link href="/admin/orders" className="nav-link">
            Orders
          </Link>
          <Link href="/admin/news" className="nav-link">
            News
          </Link>
          <Link href="/admin/create-wholesale-order" className="nav-link">
            Create Wholesale Order
          </Link>
          <Link href="/admin/supply-shipments" className="nav-link">
            Supply Shipments
          </Link>
          <Link href="/admin/generate-qr-code" className="nav-link">
            Generate QR Code
          </Link>   
          <Link href="/admin/scan-qr-code" className="nav-link">
            Scan QR Code
          </Link> 
        </nav>
      }
      {session.user.isManufacturer &&
        <nav className="nav flex-column">
          <Link href="/manufacturer/dashboard" className="nav-link active" aria-current="page">
            Dashboard
          </Link>
          <Link href="/manufacturer/create-shipment" className="nav-link">
            Create Shipment
          </Link>
          <Link href="/manufacturer/manufacturer-shipments" className="nav-link">
            Manufacturer Shipments
          </Link>
        </nav>
      }
      </div>
    </div>
  )
}

export default SideNav;