import { useState, useEffect } from "react";
import { InputBox } from "../components";
import useCurrencyInfo from "../hooks/useCurrencyInfo";
import { MdSwapVert } from "react-icons/md";
import { Button } from "@/components/ui/button";

function CurrencyConvertor() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, from, to, currencyInfo]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full max-w-2xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>
          <div className="relative w-full h-0.5">
            <Button
              variant=""
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              swap <MdSwapVert />
            </Button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CurrencyConvertor;
