import Image from "next/image";

const OrderCard = ({ cartItems }) => {
  return (
    <div className="card order-card">
      <div className="card-body">
        <h2 className="card-title">Order Items</h2>
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <Image src={item.imageOne} width={80} height={60} alt="..." />
                </td>
                <td className="align-middle">
                  {item.name} {item.color}
                </td>
                <td className="align-middle">{item.size}</td>
                <td className="align-middle">{item.quantity}</td>
                <td className="align-middle">${item.price.toFixed(2)}</td>
                <td className="align-middle">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderCard;
