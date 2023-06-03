import { useGlobalState } from "./store";
import Navbar from "./Navbar";
import { claimVesting } from "./Blockchains";

function User() {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [bal] = useGlobalState("bal");
  const [organisation] = useGlobalState("organisation");

  return (
    <div>
      <Navbar />
      <div className="p-24 mt-44">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full sm:w-1/2 bg-blue-300 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center mb-6">
              <p className="text-center text-lg text-white">
                Account: {connectedAccount.slice(0, 4) + "..." + connectedAccount.slice(-5)}
              </p>
            </div>
            <div className="flex justify-center items-center mb-6">
              <div className="bg-violet-200 text-white py-3 px-6 rounded-l-lg">
                Claimed Vested Token:
              </div>
              <div className="bg-violet-300 text-white py-3 px-6 rounded-r-lg">
                {bal}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-center text-lg text-white">Stakeholder Position: {organisation.stakeholderPost}</p>
              <p className="text-center text-lg text-white">Vested Token: {organisation ? `${organisation.token}` : ""}</p>
            </div>
            <div className="flex justify-center">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
                onClick={() => claimVesting()}
              >
                Claim your vested Token
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
