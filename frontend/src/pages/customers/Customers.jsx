import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CustomerTable from "../../components/customers/CustomerTable";
import AddCustomerModal from "../../components/customers/AddCustomerModal";

import { getCustomers } from "../../services/customerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();

      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>

          <p className="text-slate-500 mt-2">Manage all customers</p>
        </div>

        <button
          onClick={() => {
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          className="
            flex
            items-center
            gap-2

            px-5
            py-3

            rounded-2xl

            text-white

            bg-gradient-to-r
            from-violet-500
            to-fuchsia-500
          "
        >
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      <CustomerTable
        customers={customers}
        fetchCustomers={fetchCustomers}
        setOpenModal={setOpenModal}
        setSelectedCustomer={setSelectedCustomer}
      />

      {openModal && (
        <AddCustomerModal
          setOpenModal={setOpenModal}
          fetchCustomers={fetchCustomers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
    </div>
  );
};

export default Customers;
