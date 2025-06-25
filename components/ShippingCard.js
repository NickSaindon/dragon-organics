import Link from "next/link";

const ShippingCard = ({ shippingAddress }) => {
  return (
    <div className="card shipping-card">
      <div className="card-body">
        <h2 className="card-title">Shipping Address</h2>
        <p>
          <b>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </b>
          <br />
          <b>{shippingAddress.email}</b>
          <br />
          {shippingAddress.address}
          <br />
          {shippingAddress.city}, {shippingAddress.state},{" "}
          {shippingAddress.zipCode}
        </p>
        <Link href="/shipping">
          <button type="button" className="btn btn-primary">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShippingCard;
