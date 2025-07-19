import {
  deletePaymentProof,
  getAllPaymentProofs,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "../../store/slice/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProof = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    dispatch(getAllPaymentProofs());
  }, []);

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto mx-auto mt-8">
        <table className="min-w-full bg-transparent mt-5 border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-3 border px-2">User ID</th>
              <th className="w-1/3 py-3 border px-2">Status</th>
              <th className="w-1/3 py-3 border px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-center">{element.userId}</td>
                  <td className="py-3 px-4 text-center">{element.status}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-lg text-sky-600">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProof;

// ============ Drawer Component =============
export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "Pending");
      setComment(singlePaymentProof.comment || "");
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed ${openDrawer && singlePaymentProof.userId
        ? "bottom-0"
        : "-bottom-full"
        } left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end z-50`}
    >
      <div className="bg-white h-fit w-full transition-all duration-300">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-1">
            Update Payment Proof
          </h3>
          <p className="text-stone-600 text-center">
            You can update payment status and amount.
          </p>
          <form className="flex flex-col gap-5 mt-6">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600">User ID</label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="text-xl px-3 py-2 border border-stone-600 rounded-md bg-gray-100 text-stone-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl px-3 py-2 border border-stone-600 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-xl px-3 py-2 border border-stone-600 rounded-md focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600">Comment</label>
              <textarea
                rows={4}
                value={comment}
                disabled
                className="text-xl px-3 py-2 border border-stone-600 rounded-md bg-gray-100 text-stone-600 resize-none"
              />
            </div>

            <Link
              to={singlePaymentProof.proof?.url || ""}
              className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-[#b8381e]"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Payment Proof
            </Link>

            <button
              type="button"
              onClick={handlePaymentProofUpdate}
              className="bg-blue-500 py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Payment Proof"}
            </button>

            <button
              type="button"
              onClick={() => setOpenDrawer(false)}
              className="bg-yellow-500 py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
