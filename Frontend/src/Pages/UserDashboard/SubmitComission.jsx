import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commissionProof } from '../../store/slice/commissionSlice';
import { Loader2 } from 'lucide-react';

const SubmitComission = () => {
  const [proof, setProof] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('proof', proof);
    formData.append('amount', amount);
    formData.append('comment', comment);
    dispatch(commissionProof(formData));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center tracking-tight">
          Submit Commission Proof
        </h2>

        <form onSubmit={handlePaymentProof} className="space-y-6">
          {/* Proof Upload */}
          <div>
            <label htmlFor="proof" className="block text-sm font-semibold text-blue-700 mb-1">
              Upload Proof
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="proof"
                onChange={proofHandler}
                className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  transition-all duration-200
                  cursor-pointer
                  bg-blue-50 border border-blue-200 rounded-lg"
              />
              {proof && (
                <span className="text-xs text-gray-500 truncate max-w-[100px]">{proof.name}</span>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-blue-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50 text-gray-700 placeholder-gray-400 transition"
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-blue-700 mb-1">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment (optional)"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50 text-gray-700 placeholder-gray-400 resize-y h-24 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Proof'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitComission;