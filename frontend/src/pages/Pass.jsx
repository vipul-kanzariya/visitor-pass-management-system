import React, { useEffect, useState } from "react";
import { getVisitors } from "../api/visitor";
import { createPass } from "../api/pass";

function Pass() {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState("");
  const [pass, setPass] = useState(null);
  const fetchVisitors = async () => {
    const data = await getVisitors();
    console.log(data);
    setVisitors(data);
  };
  const generatePass = async () => {
    if (!selectedVisitor) {
      alert("Please select visitor!");
      return;
    }
    try {
      const response = await createPass(selectedVisitor);
      setPass(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Generate Pass</h1>
        <div className="bg-white shadow rounded-lg p-6 max-w-md">
          <h2 className="text-lg font-semibold mb-4">Select Visitor</h2>
        <select
        className="w-full border rounded px-3 py-2 mb-4"
        value={selectedVisitor}
        onChange={(e) => setSelectedVisitor(e.target.value)}
      >
        <option value="">Select Visitor</option>
        {visitors.map((visitor) => (
          <option key={visitor._id} value={visitor._id}>
            {visitor.name}
          </option>
        ))}
      </select>
      <button onClick={generatePass}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >Generate Pass</button>

      {pass && (
        <div className="mt-6 bg-white shadow rounded-lg p-6 max-w-md text-center">
          <h2 className="text-lg font-bold mb-4">Pass Generated Successfully</h2>
          <img src={pass.qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
          <p className="bg-green-100 text-green-700 px-2 py-1 rounded ml-2">Status: {pass.status}</p>
          <p className="text-gray-500 text-sm mt-2">Valid Until: {new Date(pass.validUntil).toLocaleDateString()}</p>
        </div>
      )}
      </div>
      </div>
    </>
  );
}

export default Pass;
