"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type LineItem = {
  price_data: {
    product_data: {
      name: string;
    };
  };
  quantity: string;
};

type ordersStates = Record<string, string> & {
  line_items: Array<LineItem>;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Array<ordersStates>>([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.createdAt}</td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postalCode} {order.country} <br />
                  {order.streetAdress}
                </td>
                <td>
                  {order.line_items?.map((l, index) => (
                    <div key={index}>
                      {l.quantity}x {l.price_data?.product_data.name} <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
